import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  const { token } = req.cookies;

  if (!token) return res.status(200).json({ user: null });

  try
  {
    const decoded = jwt.verify(token, JWT_SECRET);
    //console.log("/api/me.js -> decoded.email is " + decoded.email)

    const client = await MongoClient.connect(
      "mongodb+srv://GameSpaceDev:GameSpaceDev1234@gamespacecluster.79wzx7g.mongodb.net/?retryWrites=true&w=majority&appName=GameSpaceCluster"
    );

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
