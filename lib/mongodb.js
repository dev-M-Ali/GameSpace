// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add your DATABASE_URL to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
