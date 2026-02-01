import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // .env se MONGO_URI load karega

const uri = process.env.MONGO_URI;
const dbName = "test"; // jis DB ko clear karna hai

async function clearTestDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    const collections = await db.listCollections().toArray();

    for (let col of collections) {
      await db.collection(col.name).deleteMany({});
      console.log(`Cleared collection: ${col.name}`);
    }

    console.log("✅ Test database cleared!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

clearTestDatabase();
