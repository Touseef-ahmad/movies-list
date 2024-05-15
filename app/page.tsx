"use client";

import MovieCard from "@/components/movieCard";
import { useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

import { Input } from "@nextui-org/input";
import { SearchIcon } from "@/components/icons";
import { Kbd } from "@nextui-org/kbd";
import { Pagination } from "@nextui-org/react";
import { ApiResponse } from "./utils/types";
import { fetchNowPlaying } from "./utils/api";

export default function Home() {
  const [movies, setMovies] = useState<ApiResponse | null>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("query");
  const [searchInputValue, setSearchInputValue] = useState("iron man");
  const [page, setPage] = useState(1);

  const debouncedSearchMovies = debounce(
    async (page: number, query?: string) => {
      const movies = await fetchNowPlaying(page, query);
      setMovies(movies);
    },
    500
  );

  useEffect(() => {
    debouncedSearchMovies(page, searchInputValue);
  }, [page, searchInputValue]);

  useEffect(() => {
    const query = search || "iron man";
    fetchNowPlaying(page, query).then((data) => setMovies(data));
  }, [search]);

  const searchInput = (
    <Input
      value={searchInputValue}
      onChange={(e) => setSearchInputValue(e.target.value)}
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden md:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <section className="flex flex-col items-center">
      <div className="max-w-screen-md "> {searchInput}</div>
      <div className="flex flex-wrap items-center justify-center gap-4 py-8 md:py-10">
        {movies?.data.results?.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            imageUrl={movie.poster_path}
            label={movie.release_date}
            rating={movie.vote_average}
            movie_id={movie.id}
          />
        ))}
      </div>
      {movies?.data && (
        <Pagination
          total={movies?.data.total_pages}
          onChange={(page) => setPage(page)}
          initialPage={1}
        />
      )}
    </section>
  );
}
