import { addToWatchlist } from "@/app/utils/api";
import { Movie } from "@/app/utils/types";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import Link from "next/link";

type MovieCardProps = {
  movie: Partial<Movie>;
  addedToWatchlist?: boolean;
  onClickButton: () => void;
};

const MovieCard = ({
  movie,
  addedToWatchlist,
  onClickButton,
}: MovieCardProps) => {
  const date = movie?.release_date && new Date(movie?.release_date);

  return (
    <Card
      isFooterBlurred
      className="w-[250px] h-[300px] col-span-12 sm:col-span-5"
    >
      <Link href={`/movie/${movie.id}`}>
        <CardHeader className="absolute opacity-80 backdrop-blur-lg bg-background z-10 top-0 flex-col items-start">
          {date && (
            <p className="text-tiny text-inherit uppercase font-bold">
              {date.toLocaleDateString()}
            </p>
          )}
          <h4 className="text-inherit font-medium text-2xl">{movie.title}</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Movie poster"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />
      </Link>
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          {movie.vote_average && (
            <p className="text-inherit text-tiny">
              Ratings: {movie.vote_average}
            </p>
          )}
        </div>
        <Button
          onClick={onClickButton}
          className="text-tiny"
          color={addedToWatchlist ? "default" : "primary"}
          radius="full"
          size="md"
        >
          {addedToWatchlist ? "Remove from watchlist" : "Add to watchlist"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
