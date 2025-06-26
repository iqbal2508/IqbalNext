import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
const client = await clientPromise;
  const db = client.db("elearningIqbal");
  switch (req.method) {
    case "GET":
      const filter = req.query.filter || '';
      const options = {
        projection: {
          content: 0
        }
      }

      const kursus = await db.collection("kursus").find({
        title:{ $regex: filter, $options: 'i' },
      },options).toArray();

      res.json({ status: 200, data: kursus });
      break;
  }
}