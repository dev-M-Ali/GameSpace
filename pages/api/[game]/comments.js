import { MongoClient } from "mongodb"

export default async function handler(request, response) {
    if (request.method == 'POST')
    {
        const client = await MongoClient.connect(process.env.DATABASE_URL)
        const DB = client.db("GameSpaceDB")

        const comments = await DB.collection("Comments").insertOne(request.body)

        response.status(200).json({ message: "Successful!" })
    }
    else if (request.method == 'GET')
    {
        const game = request.query.game

        const client = await MongoClient.connect(process.env.DATABASE_URL)
        const DB = client.db("GameSpaceDB")

        const comments = await DB.collection("Comments").find({ game }).toArray()

        //console.log(comments)
        response.status(200).json(comments)
    }
}