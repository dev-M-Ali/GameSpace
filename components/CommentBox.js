import axios from "axios";
import { useRef } from "react";

export default function CommentBox({ game }) {
    //MISSING: Fix dummy data in the post request

    const comment = useRef()
    //const [notificationMessage, setNotification] = useState(null)

    function saveComment(event) {
        event.preventDefault()

        if (comment.current.value.length > 0)
        {
            axios.get("/api/auth/me").then(response => {

                //console.log("CommentBox.js -> response contains")
                //console.log(response.data)

                if (response.data.user)
                {
                    const obj = {
                        game: game,
                        email: response.data.user.email,
                        message: comment.current.value
                    }

                    //axios will take care of JSON.stringify and the headers
                    axios.post("/api/" + game + "/comments", obj).then(() => console.log("Comment posted successfully!")).catch(() => console.log("Some error occurred while posting your comment."))
                    //axios.post("/comments", obj).then(() => console.log("Comment posted successfully!")).catch(() => console.log("Some error occurred while posting your comment."))
                }
            })
        }
    }

    return (
        <form className="mb-6 max-w-2xl mx-auto" onSubmit={saveComment}>
            <div className="py-3 px-4 mb-4 bg-white/95 backdrop-blur-md rounded-xl border border-[#C26DFC]/30 shadow-md">
                <label htmlFor="comment" className="sr-only">
                    Your comment
                </label>
                <textarea
                    id="comment"
                    rows="6"
                    className="w-full text-base text-gray-800 bg-transparent border-0 focus:ring-0 focus:outline-none placeholder-[#8F8DFB]/70"
                    placeholder="Write a comment..."
                    required
                    ref={comment}
                />
            </div>
            <button
                type="submit"
                className="inline-flex items-center py-2.5 px-5 text-sm font-medium text-white bg-[#F67385] rounded-lg shadow-md hover:bg-[#C26DFC] focus:ring-4 focus:ring-[#F67385]/30">
                Post comment
            </button>
        </form>
    );
}