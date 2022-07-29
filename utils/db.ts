import mongoClient from "mongoose";
export async function connectDb() {
  await mongoClient.connect(
    // process.env.MONGO_URI
    process.env.MONGO_URI!
    // { useUnifiedTopology: true }
  );
}
