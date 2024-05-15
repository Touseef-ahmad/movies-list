"use client";

import MovieCard from "@/components/movieCard";
import { useEffect, useState } from "react";

import { watchlist } from "../utils/types";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchList,
} from "../utils/api";

export default function Home() {
  const [watchList, setWatchList] = useState<watchlist[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const watchListData = await getWatchlist();
        setWatchList(watchListData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="flex flex-col items-center">
      <div className="flex flex-wrap items-center justify-center gap-4 py-8 md:py-10">
        {watchList?.map((movie) => {
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
    </section>
  );
}
