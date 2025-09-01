import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
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
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  try
  {
    const decoded = jwt.verify(token, JWT_SECRET);

    const client = await MongoClient.connect(DATABASE_URL, options);
    const db = client.db("GameSpaceDB");

    const requester = await db.collection("Users").findOne(
      { email: decoded.email },
      { projection: { isAdmin: 1 } }
    );

    if (!requester || requester.isAdmin !== true)
    {
      await client.close();
      return res.status(403).json({ success: false, message: 'Forbidden: Admin privileges required' });
    }

    const users = await db.collection("Users")
      .find({}, { projection: { password: 0 } })
      .sort({ _id: -1 })
      .toArray();

    await client.close();

    return res.status(200).json({
      success: true,
      users
    });
  } catch (error)
  {
    console.error('Admin users fetch error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
} 