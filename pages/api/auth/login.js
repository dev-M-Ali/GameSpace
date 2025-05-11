import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import getConfig from 'next/config'

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig } = getConfig()
const JWT_SECRET = serverRuntimeConfig.JWT_SECRET
const JWT_EXPIRES_IN = serverRuntimeConfig.JWT_EXPIRES_IN
const DATABASE_URL = serverRuntimeConfig.DATABASE_URL

// Minimal MongoDB connection options
const options = {
  serverSelectionTimeoutMS: 5000
};

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

    const client = await MongoClient.connect(DATABASE_URL, options);
    const db = client.db("GameSpaceDB");

    const user = await db.collection("Users").findOne({ email });
    
    if (!user) {
      await client.close();
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Compare the provided password with the hashed password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    await client.close();
    
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Create a JWT token
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    // Set cookie
    res.setHeader("Set-Cookie", `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60}`);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
