import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  const { token } = req.cookies;

  if (!token) return res.status(200).json({ user: null });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const client = await MongoClient.connect(
      "mongodb+srv://GameSpaceDev:GameSpaceDev1234@gamespacecluster.79wzx7g.mongodb.net/?retryWrites=true&w=majority&appName=GameSpaceCluster"
    );
    const db = client.db("GameSpaceDB");

    const user = await db
      .collection("Users")
      .findOne({ email: decoded.email }, { projection: { password: 0 } });

    if (!user) return res.status(200).json({ user: null });

    res.status(200).json({ user });
  } catch {
    res.status(200).json({ user: null });
  }
}
