import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const client = await MongoClient.connect("mongodb+srv://GameSpaceDev:GameSpaceDev1234@gamespacecluster.79wzx7g.mongodb.net/?retryWrites=true&w=majority&appName=GameSpaceCluster");
    const db = client.db("GameSpaceDB");

    const user = await db.collection("Users").findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // For simplicity, return a dummy token (in real apps, use JWT or sessions)
    return res.status(200).json({ message: "Login successful", token: "dummy-token" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
