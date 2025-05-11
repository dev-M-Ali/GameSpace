import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/");
    } else {
      setError(data.message || "Login failed");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 mt-4 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-8 max-w-md w-full shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back Gamespacer</h1>
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        <label className="block mb-4 font-semibold">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C26DFC]"
            placeholder="you@example.com"
          />
        </label>
        <label className="block mb-6 font-semibold">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C26DFC]"
            placeholder="Enter your password"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-[#F67385] hover:bg-[#C26DFC] text-white font-bold py-3 rounded-xl transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
