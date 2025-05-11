import { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  if (!user) return <p className="text-center mt-10">You are not logged in.</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadowmt-40">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Add more user fields here if available */}
    </div>
  );
}
