// pages/api/posts.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest,res: NextResponse) {
   {
    try {
      const posts = await prisma.post.findMany({
        include: {
          author: true
        }
      });
      return NextResponse.json(posts);
    } catch (error) {
      console.error("Error retrieving posts:", error);
      NextResponse.json({ error: "Error retrieving posts" });
    }
  }
}
