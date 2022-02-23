import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  country: String,
  postalCode: String,
  fiscalNumber: String,
  username: String,
});

const Client = mongoose.models.Client || mongoose.model("Client", Schema);

export { Client };
