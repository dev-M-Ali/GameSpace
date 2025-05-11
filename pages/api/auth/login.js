import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const client = await MongoClient.connect(process.env.DATABASE_URL);
    const db = client.db("GameSpaceDB");

    const user = await db.collection("Users").findOne({ email });
    await client.close();

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // In a real app, we'd hash the password and compare the hash
    if (user.password !== password) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Create a JWT token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    // Set cookie
    res.setHeader("Set-Cookie", `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60}`);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
