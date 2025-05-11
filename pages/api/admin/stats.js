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
    
    // Get database statistics
    const totalUsers = await db.collection("Users").countDocuments();
    const totalComments = await db.collection("Comments").countDocuments();
    
    // Get scores from all game collections
    const games = ["snake", "whack-a-mole", "memory-match", "tictactoe", "1024"];
    let totalPlays = 0;
    const gameStats = [];
    
    for (const game of games) {
      const collectionName = `${game}_Scores`;
      const exists = await db.listCollections({ name: collectionName }).hasNext();
      
      if (exists) {
        const plays = await db.collection(collectionName).countDocuments();
        totalPlays += plays;
        
        const topScore = await db.collection(collectionName)
          .find()
          .sort({ score: -1 })
          .limit(1)
          .toArray();
          
        gameStats.push({
          name: game,
          plays,
          topScore: topScore.length > 0 ? topScore[0].score : 0,
          topPlayer: topScore.length > 0 ? topScore[0].email : 'N/A'
        });
      } else {
        gameStats.push({
          name: game,
          plays: 0,
          topScore: 0,
          topPlayer: 'N/A'
        });
      }
    }
    
    await client.close();
    
    return res.status(200).json({ 
      success: true, 
      stats: {
        totalUsers,
        totalGames: games.length,
        totalPlays,
        totalComments,
        gameStats
      }
    });
  } catch (error) {
    console.error('Admin stats fetch error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
} 