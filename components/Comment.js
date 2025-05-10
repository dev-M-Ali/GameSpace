export default function Comment({ email, message }) {
    //MISSING: UPDATE AND DELETE OPTIONS!
    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-lg transition hover:shadow-xl">
            <div className="mb-2 text-white font-semibold text-base">{email}</div>
            <div className="text-white/90">{message}</div>
        </div>
    );
}
