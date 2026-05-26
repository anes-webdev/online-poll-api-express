import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const userId = "cd2b6f37-46f1-47a6-bce4-481ab417d928";
const movies = [
  {
    title: "Fight Club",
    releaseYear: 1999,
    genres: ["Drama"],
    posterUrl: "sample url",
    createdBy: userId,
  },
];

const main = async () => {
  console.log("Seeding movies...");
  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
    console.log("Movie created: " + movie.title);
  }
  console.log("Seeding completed");
};

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
