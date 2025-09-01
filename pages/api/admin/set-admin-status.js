import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const JWT_SECRET = serverRuntimeConfig.JWT_SECRET;
const DATABASE_URL = serverRuntimeConfig.DATABASE_URL;

const options = {
  serverSelectionTimeoutMS: 5000
};

export default async function handler(req, res) {
  if (req.method !== 'POST')
  {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token } = req.cookies;
  const { userId, isAdmin } = req.body;

  if (!token)
  {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  if (!userId)
  {
    return res.status(400).json({ success: false, message: 'User ID is required' });
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

    const updateResult = await db.collection("Users").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { isAdmin: isAdmin === true } }
    );

    await client.close();

    if (updateResult.matchedCount === 0)
    {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      message: `User admin status updated to ${isAdmin ? 'admin' : 'regular user'}`
    });
  } catch (error)
  {
    console.error('Set admin status error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
} 