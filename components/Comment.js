export default function Comment({ email, message }) {
    // Format the message to preserve whitespace and line breaks
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
        </div>
    );
}
