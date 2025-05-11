import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";
import getConfig from 'next/config'

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig } = getConfig()
const JWT_SECRET = serverRuntimeConfig.JWT_SECRET
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
  const { token } = req.cookies;

  if (!token) return res.status(200).json({ user: null });

  let client = null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    //console.log("/api/me.js -> decoded.email is " + decoded.email)

    try {
      client = await MongoClient.connect(DATABASE_URL, options);
      console.log("Connected to MongoDB successfully");
    } catch (dbError) {
      console.error("MongoDB connection error:", dbError);
      return res.status(200).json({ user: null });
    }

    const db = client.db("GameSpaceDB");

    //user will contain _id and email
    const user = await db.collection("Users")
      .findOne({ email: decoded.email }, { projection: { password: 0 } });

    //console.log("/api/me.js -> user is ", user)

    if (!user) return res.status(200).json({ user: null });

    res.status(200).json({ user });
  } catch (error) {
    console.error("Auth verification error:", error);
    res.status(200).json({ user: null });
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
