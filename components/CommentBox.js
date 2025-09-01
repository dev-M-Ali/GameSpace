import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CommentBox({ game, onCommentAdded }) {
    const commentRef = useRef();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState({ message: "", type: "" });
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try
            {
                const { data } = await axios.get("/api/auth/me");
                setUser(data.user);
            } catch (error)
            {
                console.error("Failed to fetch user", error);
            } finally
            {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogin = () => {
        router.push("/auth/login");
    };

    const saveComment = async (event) => {
        event.preventDefault();

        if (!user)
        {
            setFeedback({
                message: "Please log in to post a comment",
                type: "error"
            });
            return;
        }

        const commentText = commentRef.current.value;
        if (commentText.trim().length === 0)
        {
            setFeedback({
                message: "Comment cannot be empty",
                type: "error"
            });
            return;
        }

        try
        {
            setFeedback({ message: "Posting your comment...", type: "pending" });

            const commentData = {
                game: game,
                email: user.email,
                message: commentText
            };

            await axios.post(`/api/${game}/comments`, commentData);

            commentRef.current.value = "";

            setFeedback({
                message: "Comment posted successfully!",
                type: "success"
            });

            setTimeout(() => {
                setFeedback({ message: "", type: "" });
            }, 3000);

            if (onCommentAdded && typeof onCommentAdded === 'function')
            {
                onCommentAdded();
            }
        } catch (error)
        {
            console.error("Error posting comment:", error);
            setFeedback({
                message: "Failed to post comment. Please try again.",
                type: "error"
            });
        }
    };

    const getFeedbackStyles = () => {
        switch (feedback.type)
        {
            case "success":
                return "bg-green-100 text-green-800 border-green-300";
            case "error":
                return "bg-red-100 text-red-800 border-red-300";
            case "pending":
                return "bg-blue-100 text-blue-800 border-blue-300";
            default:
                return "hidden";
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {loading ? (
                <div className="flex justify-center py-4">
                    <div className="animate-pulse text-white/80">Loading comment box...</div>
                </div>
            ) : (
                <>
                    {!user && (
                        <div className="mb-4 p-4 bg-[#C26DFC]/20 rounded-xl text-center border border-[#C26DFC]/40">
                            <p className="text-white mb-3">Please log in to post comments</p>
                            <button
                                onClick={handleLogin}
                                className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-[#C26DFC] rounded-lg shadow-md hover:bg-[#A84FE0] transition-all active:scale-95"
                            >
                                Log In
                            </button>
                        </div>
                    )}

                    {feedback.message && (
                        <div className={`mb-4 p-3 rounded-lg border ${getFeedbackStyles()}`}>
                            {feedback.message}
                        </div>
                    )}

                    <form className="mb-6" onSubmit={saveComment}>
                        <div className="py-3 px-4 mb-4 bg-white/95 backdrop-blur-md rounded-xl border border-[#C26DFC]/30 shadow-md">
                            <label htmlFor="comment" className="sr-only">
                                Your comment
                            </label>
                            <textarea
                                id="comment"
                                rows="6"
                                className="w-full text-base text-gray-800 bg-transparent border-0 focus:ring-0 focus:outline-none placeholder-[#8F8DFB]/70 resize-y"
                                placeholder={user ? "Write a comment..." : "Log in to comment..."}
                                required
                                ref={commentRef}
                                disabled={!user}
                                style={{ whiteSpace: 'pre-wrap' }}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!user}
                            className={`inline-flex items-center py-2.5 px-5 text-sm font-medium text-white rounded-lg shadow-md transition-all active:scale-95 ${user
                                ? "bg-[#F67385] hover:bg-[#E85A7A] focus:ring-4 focus:ring-[#F67385]/30"
                                : "bg-gray-400 cursor-not-allowed"
                                }`}
                        >
                            Post comment
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}