-- CreateTable
CREATE TABLE "Watchlist" (
    "movie_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Watchlist_movie_id_key" ON "Watchlist"("movie_id");
