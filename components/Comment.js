export default function Comment({ email, message, deleteCommentFunc }) {
    const formattedMessage = message?.split('\n').map((line, index) => (
        <span key={index}>
            {line}
            {index < message.split('\n').length - 1 && <br />}
        </span>
    ));


    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-lg transition hover:shadow-xl">
            <div className="mb-2 text-white font-semibold text-base">{email}</div>
            <div className="text-white/90 whitespace-pre-line break-words">{formattedMessage}</div>

            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 my-4"></div>

            {
                deleteCommentFunc &&
                <button onClick={deleteCommentFunc} className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-[#fc6dab] rounded-lg shadow-md hover:bg-[#A84FE0] transition-all active:scale-95">Delete</button>
            }
        </div>
    );
}
