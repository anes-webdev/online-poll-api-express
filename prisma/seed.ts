// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const user = [
//   {
//     username: "admin",
//     password: admin,
//   },
// ];

// const main = async () => {
//   console.log("Seeding users...");
//   for (const user of users) {
//     await prisma.user.create({
//       data: user,
//     });
//     console.log("User created: " + user.username);
//   }
//   console.log("Seeding completed");
// };

// main()
//   .catch((err) => {
//     console.log(err);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
