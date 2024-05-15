import { Movie } from "@/app/utils/types";
import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const jsonbody = await req.json();
  const movie: Movie = jsonbody.movie;
  try {
    const existingWatchlistEntry = await prisma.watchlist.findFirst({
      where: {
        id: movie.id,
      },
    });
    if (!existingWatchlistEntry) {
      const { genre_ids, release_date, ...rest } = movie;
      const release_date_obj = new Date(release_date);
      const newWatchlistEntry = await prisma.watchlist.create({
        data: {
          id: movie.id,
          overview: movie.overview,
          title: movie.title,
          vote_average: movie.vote_average,
          poster_path: movie.poster_path,
          release_date: release_date_obj.toISOString(),
        },
      });

      return NextResponse.json(newWatchlistEntry, { status: 201 });
    }
    return NextResponse.json({ message: "already added" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const watchlistItems = await prisma.watchlist.findMany();

    return NextResponse.json([...watchlistItems], { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const jsonBody = await req.json();
  const movieId = jsonBody.movieId;
  try {
    const existingWatchlistEntry = await prisma.watchlist.findFirst({
      where: {
        id: movieId,
      },
    });
    if (existingWatchlistEntry) {
      await prisma.watchlist.delete({
        where: {
          id: movieId,
        },
      });
      return NextResponse.json(
        { message: "Successfully removed from watchlist" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "Item not found in watchlist" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
