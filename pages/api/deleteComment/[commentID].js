import { MongoClient } from "mongodb";
import { ObjectId } from 'mongodb'

export default async function handler(request, response) {
    if (request.method === 'GET')
    {
        const commentID = request.query.commentID

        const client = await MongoClient.connect(process.env.DATABASE_URL)
        const DB = client.db("GameSpaceDB")

        console.log(commentID)
        await DB.collection("Comments").deleteOne({ _id: new ObjectId(commentID) })

        response.status(200).json("Done!")
    }
}