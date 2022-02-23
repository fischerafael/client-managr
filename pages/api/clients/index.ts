import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, headers, query, method } = req;

  if (method === "POST") {
    try {
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  res.status(500).json({ error: "Method not allowed" });
}
