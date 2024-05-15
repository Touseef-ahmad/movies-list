"use client";

import {
  addToWatchlist,
  fetchMovieById,
  getWatchlist,
  removeFromWatchList,
} from "@/app/utils/api";
import { Movie, watchlist } from "@/app/utils/types";
import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function MovieDetailPage({
  params,
}: {
  params: { movie_id: string };
}) {
  const [movie, setMovie] = useState<Movie>();
  const [watchList, setWatchList] = useState<watchlist[] | null>();

  useEffect(() => {
    const fetchMovieAndWatchList = async () => {
      const data = await fetchMovieById(params.movie_id);
      const movie = data?.data;
      setMovie(movie);
      const watchList = await getWatchlist();
      setWatchList(watchList);
    };
    fetchMovieAndWatchList();
  }, [params.movie_id]);

  const isAlreadyIncluded = Boolean(
    watchList?.filter((watch) => watch.id === movie?.id).length
  );

  console.log(watchList, movie, isAlreadyIncluded);

  const addToWatchList = async () => {
    if (!isAlreadyIncluded && movie) {
      await addToWatchlist(movie);
    } else if (movie?.id) {
      await removeFromWatchList(movie?.id);
    }
    const watchList = await getWatchlist();
    setWatchList(watchList);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <div className="shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              alt={movie?.title}
              className="w-full h-auto object-cover object-center"
            />
          </div>
          <div className="w-full md:w-2/3 p-6">
            <h1 className="text-3xl text-inherit mb-2">{movie?.title}</h1>
            <p className="text-lg text-inherit mb-4">
              Release Date: {movie?.release_date}
            </p>
            <p className="text-lg text-inherit mb-4">{movie?.overview}</p>
            <div className="flex justify-between items-center">
              <p className="text-lg text-inherit">
                Rating: {movie?.vote_average}/10
              </p>
              <button
                onClick={addToWatchList}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                {isAlreadyIncluded ? "Added to watchlist" : "Add to watchlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
