import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../src/database";
import { Client } from "../../../src/database/Client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, headers, query, method } = req;

  db()
    .then(() => {})
    .catch(() => {
      throw new Error("Unable to connect to database");
    });

  if (method === "POST") {
    try {
      const hasClient = await Client.findOne({ username: body.username }).where(
        { name: body.name }
      );
      if (hasClient) throw new Error("Client with this name already exists");

      const newClient = await Client.create(body);

      return res.status(201).json({ data: newClient, error: null });
    } catch (error: any) {
      return res.status(400).json({ data: null, error: error.message });
    }
  }

  if (method === "GET") {
    try {
      const { username } = query;

      if (username) {
        const clients = await Client.find({ username });

        return res.status(200).json({ data: clients, error: null });
      }

      const clients = await Client.find();

      return res.status(200).json({ data: clients, error: null });
    } catch (error: any) {
      return res.status(400).json({ data: null, error: error.message });
    }
  }

  return res.status(500).json({ data: null, error: "Method not allowed" });
}
