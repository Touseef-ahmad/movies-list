export async function fetchNowPlaying() {
  try {
    const response = await fetch("/api/movies/now_playing");
    return await response.json();
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    return null;
  }
}

export async function fetchPopular() {
  try {
    const response = await fetch("/api/movies/popular");
    return await response.json();
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return null;
  }
}

export async function fetchTopRated() {
  try {
    const response = await fetch("/api/movies/top_rated");
    return await response.json();
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return null;
  }
}

export async function fetchUpcoming() {
  try {
    const response = await fetch("/api/movies/upcoming");
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

export async function fetchGenres() {
  try {
    const response = await fetch("/api/genre/list");
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    return null;
  }
}
