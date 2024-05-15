import { ApiResponse, Movie, MovieResponse, watchlist } from "./types";

const BASE_URL = "http://localhost:3000/api";

export async function fetchNowPlaying(
  page: number,
  query?: string | null
): Promise<ApiResponse | null> {
  try {
    let url = `${BASE_URL}/discover?page=${page}`;

    if (query) url += `&query=${query}`;

    const response = await fetch(url);

    return await response.json();
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    return null;
  }
}

export async function fetchMovieById(
  id: string
): Promise<MovieResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}`);

    return await response.json();
  } catch (error) {
    console.error("Error fetching movie", error);
    return null;
  }
}

export async function searchMovies(query: string): Promise<ApiResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/discover?query=${query}`);

    return await response.json();
  } catch (error) {
    console.error("Error searching movies:", error);
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

export async function fetchGenres(): Promise<ApiResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/genre/list`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    return null;
  }
}

export async function addToWatchlist(
  movie: Partial<Movie>
): Promise<watchlist | null> {
  try {
    const response = await fetch(`${BASE_URL}/watchlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movie }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    return null;
  }
}

export async function getWatchlist(): Promise<watchlist[] | null> {
  try {
    const response = await fetch(`${BASE_URL}/watchlist`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return null;
  }
}

export async function removeFromWatchList(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/watchlist`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieId: id }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    return null;
  }
}
