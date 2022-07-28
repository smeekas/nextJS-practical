import mongoClient from "mongoose";
export async function connectDb() {
  await mongoClient.connect(
    `mongodb+srv://admin:ukWJehCCQpnTIinv@cluster0.jdmz6ye.mongodb.net/practical?retryWrites=true&w=majority
    `,
    {}
    // { useUnifiedTopology: true }
  );
}
