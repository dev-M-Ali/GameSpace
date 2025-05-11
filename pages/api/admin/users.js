import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import getConfig from 'next/config';

// Get config
const { serverRuntimeConfig } = getConfig();
const JWT_SECRET = serverRuntimeConfig.JWT_SECRET;
const DATABASE_URL = serverRuntimeConfig.DATABASE_URL;

// Minimal MongoDB connection options
const options = {
  serverSelectionTimeoutMS: 5000
};

export default async function handler(req, res) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Connect to database
    const client = await MongoClient.connect(DATABASE_URL, options);
    const db = client.db("GameSpaceDB");
    
    // Check if the requester is an admin
    const requester = await db.collection("Users").findOne(
      { email: decoded.email },
      { projection: { isAdmin: 1 } }
    );
    
    if (!requester || requester.isAdmin !== true) {
      await client.close();
      return res.status(403).json({ success: false, message: 'Forbidden: Admin privileges required' });
    }
    
    // Get all users with password excluded
    const users = await db.collection("Users")
      .find({}, { projection: { password: 0 } })
      .sort({ _id: -1 }) // Sort by newest first
      .toArray();
    
    await client.close();
    
    return res.status(200).json({ 
      success: true, 
      users
    });
  } catch (error) {
    console.error('Admin users fetch error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
} 