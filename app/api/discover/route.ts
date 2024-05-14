import { type NextRequest } from "next/server";

import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`
    );
    const data = await response.json();
    return Response.json({ data });
  } catch (error) {
    return NextResponse.error();
  }
}
