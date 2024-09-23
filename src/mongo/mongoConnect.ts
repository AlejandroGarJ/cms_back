import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();
const uri = `mongodb+srv://${process.env.mongo_username}:${process.env.mongo_password}@cluster0.mddxc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
