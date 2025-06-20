import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

// Definisikan tipe data untuk 1 item kursus
type Kursus = {
  _id: string;         // MongoDB ObjectId dalam bentuk string
  nama: string;
  deskripsi: string;
  // Tambahkan field lain sesuai isi koleksi 'kursus' kamu, misalnya:
  // harga: number;
  // durasi: string;
};

// Tipe untuk response API
type ResponseData = {
  message: string;
  status: number;
  data: Kursus[]; // Tidak lagi pakai `any`
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const client = await clientPromise;
  const db = client.db("elearningIqbal");

  switch (req.method) {
    case "GET":
      try {
        const allPosts = await db.collection("kursus").find({}).toArray();
        res.status(200).json({
          status: 200,
          data: allPosts as Kursus[],
          message: 'Data berhasil diambil'
        });
      } catch (error) {
        res.status(500).json({
          status: 500,
          data: [],
          message: 'Terjadi kesalahan saat mengambil data'
        });
      }
      break;

    default:
      res.status(405).json({
        status: 405,
        data: [],
        message: 'Metode tidak diizinkan'
      });
  }
}
//UPdate