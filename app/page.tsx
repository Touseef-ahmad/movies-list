"use client";

import MovieCard from "@/components/movieCard";
import { useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";

import { Input } from "@nextui-org/input";
import { SearchIcon } from "@/components/icons";
import { Kbd } from "@nextui-org/kbd";
import { Pagination, Spinner } from "@nextui-org/react";
import { ApiResponse, watchlist } from "./utils/types";
import {
  addToWatchlist,
  fetchNowPlaying,
  getWatchlist,
  removeFromWatchList,
} from "./utils/api";

export default function Home() {
  const [movies, setMovies] = useState<ApiResponse | null>(null);
  const [watchList, setWatchList] = useState<watchlist[] | null>(null);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const search = searchParams.get("query");
  const [searchInputValue, setSearchInputValue] = useState("iron man");
  const [page, setPage] = useState(1);

  const debouncedSearchMovies = useRef(
    debounce(async (page: number, query?: string) => {
      const movies = await fetchNowPlaying(page, query);
      setMovies(movies);
      setIsLoading(false);
    }, 500)
  );

  useEffect(() => {
    setIsLoading(true);
    debouncedSearchMovies.current(page, searchInputValue);
  }, [page, searchInputValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const query = search || "iron man";
        const moviesData = await fetchNowPlaying(page, query);
        setMovies(moviesData);

        const watchListData = await getWatchlist();
        setWatchList(watchListData);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search, page]);

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
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <Spinner label="Loading..." color="default" labelColor="foreground" />
        </div>
      )}
      <section className="flex flex-col items-center">
        <div className="max-w-screen-md "> {searchInput}</div>
        {!isLoading &&
          (!movies || !movies.data || movies.data.results.length === 0) && (
            <div className="text-center mt-8">No movies found.</div>
          )}
        <div className="flex flex-wrap items-center justify-center gap-4 py-8 md:py-10">
          {movies?.data.results?.map((movie) => {
            const isAlreadyIncluded = Boolean(
              watchList?.filter((watch) => watch.id === movie.id).length
            );
            return (
              <MovieCard
                onClickButton={async () => {
                  if (!isAlreadyIncluded) {
                    await addToWatchlist(movie);
                  } else {
                    await removeFromWatchList(movie.id);
                  }
                  const watchList = await getWatchlist();
                  setWatchList(watchList);
                }}
                addedToWatchlist={isAlreadyIncluded}
                key={movie.id}
                movie={movie}
              />
            );
          })}
        </div>
        {movies?.data && (
          <Pagination
            isDisabled={isLoading}
            total={movies?.data.total_pages}
            onChange={(page) => {
              setIsLoading(true);
              setPage(page);
            }}
            initialPage={1}
          />
        )}
      </section>
    </>
  );
}
