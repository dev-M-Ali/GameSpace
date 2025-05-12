import { useState, useEffect } from "react"
import Comment from "./Comment";
import CommentBox from "./CommentBox";
import axios from "axios";

export default function CommentsSection({ game }) {
    const [commentsState, setComments] = useState([]);
    const [playerEmail, setPlayerEmail] = useState(null)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchComments = async () => {
        try
        {

            setLoading(true);
            const response = await axios.get(`/api/${game}/comments`);
            setComments(response.data);
            setError(null);
            console.log(response.data)

        } catch (err)
        {
            console.error("Error fetching comments:", err);
            setError("Failed to load comments");
        } finally
        {
            setLoading(false);
        }
    };

    function deleteComment(index) {
        axios.get("/api/deleteComment/" + commentsState[index]._id).then(response => {

            console.log(response)

            setComments(prevState => {
                const newArr = [...prevState]

                newArr.splice(index, 1)

                return newArr
            })

        }).catch(error => console.log(error))
    }

    useEffect(() => {
        if (game)
        {
            fetchComments();
        }
    }, [game]);

    useEffect(() => {

        axios.get("/api/auth/me").then(response => {
            if (response.data.user)
            {
                setPlayerEmail(response.data.user.email)
            }
        })

    }, [])

    if (!game)
    {
        return (
            <div className="text-white text-center py-10">
                The required resource could not be found!
            </div>
        );
    }

    return (
        <div className="space-y-4 max-w-2xl mx-auto">
            <CommentBox game={game} onCommentAdded={fetchComments} />

            <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4">
                    {loading ? 'Loading comments...' : commentsState.length > 0 ? 'Comments' : 'No comments yet'}
                </h3>

                {error && (
                    <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4 border border-red-300">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-white/70 animate-pulse">Loading comments...</div>
                ) : (
                    commentsState.length > 0 ? (
                        <div className="space-y-4">
                            {commentsState.map((comment, index) => (
                                <Comment
                                    email={comment.email}
                                    message={comment.message}
                                    deleteCommentFunc={(playerEmail === comment.email) && (() => deleteComment(index))}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-white/70">
                            Be the first to leave a comment!
                        </div>
                    )
                )}
            </div>
        </div>
    );
}