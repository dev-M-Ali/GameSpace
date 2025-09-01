import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const DATABASE_URL = serverRuntimeConfig.DATABASE_URL;

const options = {
  serverSelectionTimeoutMS: 5000
};

export default async function handler(req, res) {
  if (req.method !== "POST")
  {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password)
  {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try
  {
    const client = await MongoClient.connect(DATABASE_URL, options);
    const db = client.db("GameSpaceDB");

    const existingUser = await db.collection("Users").findOne({ email });
    if (existingUser)
    {
      await client.close();
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection("Users").insertOne({ email, password: hashedPassword });

    await client.close();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error)
  {
    console.error("Signup API error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
