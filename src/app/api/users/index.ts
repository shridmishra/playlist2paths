import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

// GET: Fetch all users
// POST: Create a new user
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  }

  if (req.method === 'POST') {
    const { email, name } = req.body;
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    return res.status(201).json(newUser);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
