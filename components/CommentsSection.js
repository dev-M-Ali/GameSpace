import { useState, useEffect } from "react"
import Comment from "./Comment";
import CommentBox from "./CommentBox";
import axios from "axios";

export default function CommentsSection({ game }) {
    const [commentsState, setComments] = useState(null)

    useEffect(() => {
        axios.get("/api/" + game + "/comments").then(response => setComments(response.data))
    }, [game])

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
            <CommentBox game={game} />

            {
                commentsState &&
                commentsState.map((comment) => (
                    <Comment
                        email={comment.email}
                        message={comment.message}
                    />
                ))
            }
        </div>
    );
}