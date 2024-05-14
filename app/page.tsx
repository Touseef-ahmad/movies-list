import { fetchNowPlaying } from "./utils/api";
import MovieCard from "@/components/movieCard";

export default async function Home() {
  const movies = await fetchNowPlaying();

  return (
    <section className="flex flex-wrap items-center justify-center gap-4 py-8 md:py-10">
      {movies?.data.results?.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          imageUrl={movie.backdrop_path}
          label="Now Playing"
          rating={movie.popularity}
        />
      ))}
    </section>
  );
}
