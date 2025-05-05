import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";
import getConfig from 'next/config'

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig } = getConfig()
const JWT_SECRET = serverRuntimeConfig.JWT_SECRET
const DATABASE_URL = serverRuntimeConfig.DATABASE_URL

export default async function handler(req, res) {
  const { token } = req.cookies;

  if (!token) return res.status(200).json({ user: null });

  try
  {
    const decoded = jwt.verify(token, JWT_SECRET);
    //console.log("/api/me.js -> decoded.email is " + decoded.email)

    const client = await MongoClient.connect(DATABASE_URL);

    const db = client.db("GameSpaceDB");

    //user will contain _id and email
    const user = await db.collection("Users")
      .findOne({ email: decoded.email }, { projection: { password: 0 } });

    //console.log("/api/me.js -> user is ", user)

    if (!user) return res.status(200).json({ user: null });

    res.status(200).json({ user });
  } catch (error)
  {
    console.log(error)
    res.status(200).json({ user: null });
  }
}
