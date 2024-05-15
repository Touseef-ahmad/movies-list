import { fetchMovieById } from "@/app/utils/api";
import { Image } from "@nextui-org/react";

export default async function MovieDetailPage({
  params,
}: {
  params: { movie_id: string };
}) {
  const data = await fetchMovieById(params.movie_id);
  const movie = data?.data;

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
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Add to watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
