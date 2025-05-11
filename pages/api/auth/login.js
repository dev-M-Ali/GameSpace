import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import getConfig from 'next/config'

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig } = getConfig()
const JWT_SECRET = serverRuntimeConfig.JWT_SECRET
const JWT_EXPIRES_IN = serverRuntimeConfig.JWT_EXPIRES_IN
const DATABASE_URL = serverRuntimeConfig.DATABASE_URL

// More robust MongoDB connection options
const options = {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  useUnifiedTopology: true,
  retryWrites: true,
  maxPoolSize: 10
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  let client = null;
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    // Connect to MongoDB with error handling
    try {
      client = await MongoClient.connect(DATABASE_URL, options);
      console.log("Connected to MongoDB successfully");
    } catch (dbError) {
      console.error("MongoDB connection error:", dbError);
      res.status(500).json({ message: "Database connection error", error: dbError.message });
      return;
    }
    
    const db = client.db("GameSpaceDB");

    const user = await db.collection("Users").findOne({ email });
    
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Compare the provided password with the hashed password using bcrypt
    let passwordMatch = false;
    try {
      passwordMatch = await bcrypt.compare(password, user.password);
    } catch (bcryptError) {
      console.error("Password comparison error:", bcryptError);
      res.status(500).json({ message: "Error verifying credentials", error: bcryptError.message });
      return;
    }
    
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
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  } finally {
    // Close the MongoDB connection if it was opened
    if (client) {
      try {
        await client.close();
        console.log("MongoDB connection closed");
      } catch (closeError) {
        console.error("Error closing MongoDB connection:", closeError);
      }
    }
  }
}
