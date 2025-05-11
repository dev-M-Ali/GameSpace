import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { redirect } = router.query;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("Attempting login for:", email);
      const res = await axios.post("/api/auth/login", { email, password });
      console.log("Login successful");

      // Redirect to the page specified in the query parameter, or home if none
      const redirectPath = redirect || "/";
      router.push(redirectPath);
    } catch (err) {
      console.error("Login error:", err);
      
      // Detailed error handling
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response error:", err.response.data);
        setError(err.response.data.message || `Error ${err.response.status}: ${err.response.statusText}`);
      } else if (err.request) {
        // The request was made but no response was received
        console.error("Request error:", err.request);
        setError("No response from server. Please check your connection and try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Setup error:", err.message);
        setError(`Error: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 mt-4 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-8 max-w-md w-full shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back Gamespacer</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
            <p className="font-medium">Login Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
        <label className="block mb-4 font-semibold">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C26DFC]"
            placeholder="you@example.com"
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </label>
        <button
          type="submit"
          className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-[#F67385] hover:bg-[#C26DFC]'} text-white font-bold py-3 rounded-xl transition-colors`}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
