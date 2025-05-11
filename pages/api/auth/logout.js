import { serialize } from "cookie";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Clear the authentication cookie by setting an expired date
  res.setHeader(
    "Set-Cookie",
    "token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0"
  );

  return res.status(200).json({ message: "Logged out successfully" });
}
