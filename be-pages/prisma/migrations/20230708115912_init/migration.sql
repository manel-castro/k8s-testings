-- CreateTable
CREATE TABLE "HeroSection" (
    "id" SERIAL NOT NULL,
    "title1" TEXT NOT NULL,
    "title2" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "button" TEXT NOT NULL,
    "buttonLink" TEXT NOT NULL,
    "videoSrc" TEXT NOT NULL,

    CONSTRAINT "HeroSection_pkey" PRIMARY KEY ("id")
);
