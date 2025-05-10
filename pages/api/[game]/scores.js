import { MongoClient } from "mongodb"

export default async function handler(request, response) {
    if (request.method == 'POST')
    {
        const game = request.query.game

        const client = await MongoClient.connect(process.env.DATABASE_URL)
        const DB = client.db("GameSpaceDB")

        const comments = await DB.collection(game + "_Scores").insertOne(request.body)

        response.status(200).json({ message: "Successful!" })
    }
    else if (request.method == 'GET')
    {
        const game = request.query.game

        const client = await MongoClient.connect(process.env.DATABASE_URL)
        const DB = client.db("GameSpaceDB")

        const scoresArr = await DB.collection(game + "_Scores").find().toArray()

        //console.log(comments)
        response.status(200).json(scoresArr)
    }
}