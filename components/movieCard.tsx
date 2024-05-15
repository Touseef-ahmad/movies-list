import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import Link from "next/link";

type MovieCardProps = {
  title: string;
  imageUrl: string;
  label: string;
  rating: string | number;
  movie_id: number;
};

const MovieCard = ({
  title,
  imageUrl,
  label,
  rating,
  movie_id,
}: MovieCardProps) => {
  return (
    <Link href={`/movie/${movie_id}`}>
      <Card
        isFooterBlurred
        className="w-[200px] h-[300px] col-span-12 sm:col-span-5"
      >
        <CardHeader className="absolute opacity-80 backdrop-blur-lg bg-background z-10 top-0 flex-col items-start">
          {label && (
            <p className="text-tiny text-inherit uppercase font-bold">
              {label}
            </p>
          )}
          <h4 className="text-inherit font-medium text-2xl">{title}</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Movie poster"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src={`https://image.tmdb.org/t/p/w500${imageUrl}`}
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            {rating && (
              <p className="text-inherit text-tiny">Ratings: {rating}</p>
            )}
          </div>
          <Button className="text-tiny" color="primary" radius="full" size="md">
            Add to watchlist
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default MovieCard;
