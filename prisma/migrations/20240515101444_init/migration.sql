-- CreateTable
CREATE TABLE "Watchlist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "adult" BOOLEAN,
    "backdrop_path" TEXT,
    "original_language" TEXT,
    "original_title" TEXT,
    "overview" TEXT,
    "popularity" REAL,
    "poster_path" TEXT,
    "release_date" DATETIME,
    "title" TEXT,
    "video" BOOLEAN,
    "vote_average" REAL,
    "vote_count" INTEGER
);
