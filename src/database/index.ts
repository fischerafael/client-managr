import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

const db = () => {
  if (!MONGO_URL) throw new Error("No MONGO_URL provided");

  mongoose.connect(MONGO_URL).then((mongoose) => {
    return mongoose;
  });
};

export { db };
