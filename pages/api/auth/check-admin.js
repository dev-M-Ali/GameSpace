import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const JWT_SECRET = serverRuntimeConfig.JWT_SECRET;
const DATABASE_URL = serverRuntimeConfig.DATABASE_URL;

const options = {
  serverSelectionTimeoutMS: 5000
};

export default async function handler(req, res) {
  const { token } = req.cookies;

  if (!token)
  {
    return res.status(401).json({ isAdmin: false, message: "Not authenticated" });
  }

  try
  {
    const decoded = jwt.verify(token, JWT_SECRET);

    const client = await MongoClient.connect(DATABASE_URL, options);
    const db = client.db("GameSpaceDB");

    const user = await db.collection("Users").findOne(
      { email: decoded.email },
      { projection: { password: 0 } }
    );

    await client.close();

    if (!user)
    {
      return res.status(401).json({ isAdmin: false, message: "User not found" });
    }

    const isAdmin = user.isAdmin === true;

    return res.status(200).json({ isAdmin, user });
  } catch (error)
  {
    console.error("Admin check error:", error);
    return res.status(401).json({ isAdmin: false, message: "Authentication error" });
  }
} 