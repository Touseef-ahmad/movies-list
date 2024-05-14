import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { movie_id: string } }
) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${params.movie_id}?api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await response.json();
    return Response.json({ data });
  } catch (error) {
    return NextResponse.error();
  }
}
