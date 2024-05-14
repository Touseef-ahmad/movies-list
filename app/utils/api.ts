import { ApiResponse } from "./types";
const BASE_URL = "http://localhost:3000/api";
export async function fetchNowPlaying(): Promise<ApiResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/movies/now_playing`);

    return await response.json();
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    return null;
  }
}

export async function searchMovies(query: string): Promise<ApiResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/discover?query=${query}`);

    return await response.json();
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    return null;
  }
}

export async function fetchPopular(): Promise<ApiResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/movies/popular`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return null;
  }
}

export async function fetchTopRated(): Promise<ApiResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/movies/top_rated`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return null;
  }
}

export async function fetchUpcoming(): Promise<ApiResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/movies/upcoming`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return null;
  }
}

export async function fetchMovieById(movieId: string) {
  try {
    const response = await fetch(`/api/movie/${movieId}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    return null;
  }
}

export async function fetchGenres(): Promise<ApiResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/genre/list`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    return null;
  }
}
