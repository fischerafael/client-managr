import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../src/database";
import { Client } from "../../../../src/database/Client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, headers, query, method } = req;

  const { api_key } = headers;
  if (!api_key) {
    return res.status(401).json({ data: "No API_KEY provided", error: null });
  }
  if (api_key !== process.env.API_KEY) {
    return res.status(401).json({ data: "Invalid API_KEY", error: null });
  }

  db()
    .then(() => {})
    .catch(() => {
      throw new Error("Unable to connect to database");
    });

  if (method === "DELETE") {
    try {
      const { id } = query;

      const deletedClient = await Client.findByIdAndDelete(id);
      if (!deletedClient) {
        return res
          .status(404)
          .json({ data: null, error: "Client does not exist" });
      }

      return res.status(200).json({ data: deletedClient, error: null });
    } catch (error: any) {
      return res.status(400).json({ data: null, error: error.message });
    }
  }

  if (method === "GET") {
    try {
      const { id } = query;

      const client = await Client.findById(id);
      if (!client) {
        return res
          .status(404)
          .json({ data: null, error: "Client does not exist" });
      }

      return res.status(200).json({ data: client, error: null });
    } catch (error: any) {
      res.status(400).json({ data: null, error: error.message });
    }
  }

  if (method === "PUT") {
    try {
      const { id } = query;

      const hasName = await Client.findOne({ username: body.username }).where({
        name: body.name,
      });
      if (hasName) {
        return res.status(403).json({
          data: null,
          error: "Client with this name already exists",
        });
      }

      const updatedClient = await Client.findByIdAndUpdate(id, body, {
        new: true,
      });
      if (!updatedClient) {
        return res
          .status(404)
          .json({ data: null, error: "Client does not exist" });
      }

      return res.status(200).json({ data: updatedClient, error: null });
    } catch (error: any) {
      return res.status(400).json({ data: null, error: error.message });
    }
  }

  return res.status(500).json({ data: null, error: "Method not allowed" });
}
