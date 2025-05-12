import { MongoClient } from "mongodb"
import getConfig from 'next/config'

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig } = getConfig()
const DATABASE_URL = serverRuntimeConfig.DATABASE_URL

// Minimal MongoDB connection options
const options = {
    serverSelectionTimeoutMS: 5000
};

export default async function handler(request, response) {
    if (request.method == 'POST')
    {
        //console.log(request.body)
        const game = request.query.game

        const client = await MongoClient.connect(DATABASE_URL, options)
        const DB = client.db("GameSpaceDB")

        const updateDocument = {
            $set: {
                ...request.body
            },
        };

        //console.log(updateDocument)
        await DB.collection(game + "_Scores").updateOne({ _id: request.body._id }, updateDocument, { upsert: true })

        response.status(200).json({ message: "Successful!" })
    }
    else if (request.method == 'GET')
    {
        const game = request.query.game

        const client = await MongoClient.connect(DATABASE_URL, options)
        const DB = client.db("GameSpaceDB")

        const scoresArr = await DB.collection(game + "_Scores").find().toArray()

        //console.log(comments)
        response.status(200).json(scoresArr)
    }
}