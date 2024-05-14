import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await response.json();
    return Response.json({ data });
  } catch (error) {
    return NextResponse.error();
  }
}
