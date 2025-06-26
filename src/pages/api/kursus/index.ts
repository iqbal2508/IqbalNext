import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { Content } from 'next/font/google';
import { title } from 'process';

// Definisikan tipe data untuk 1 item kursus

// Tipe untuk response API

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
        title:{ $regex: filter, $option: 'i'},
      },options).toArray();
      res.json({
        status: 200, data: kursus,
        message: ''
      });
      break;
    }
  }
      