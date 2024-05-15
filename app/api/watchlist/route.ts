import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();

  const jsonbody = await req.json();
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ ", jsonbody);
  try {
    const existingWatchlistEntry = await prisma.watchlist.findUnique({
      where: {
        movie_id: jsonbody.movie_id,
      },
    });
    if (!existingWatchlistEntry) {
      const newWatchlistEntry = await prisma.watchlist.create({
        data: {
          movie_id: jsonbody.movie_id,
        },
      });

      return NextResponse.json(newWatchlistEntry, { status: 201 });
    }
    return NextResponse.json({ message: "already added" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  const prisma = new PrismaClient();

  try {
    const watchlistItems = await prisma.watchlist.findMany();

    return NextResponse.json([...watchlistItems], { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
