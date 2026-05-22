import { z } from "zod";

const addToWatchListSchema = z.object({
  movieId: z.string().uuid(),
  status: z
    .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
      error: () => {
        message: "Status is not valid";
      },
    })
    .optional(),
  rating: z.coerce
    .number()
    .int("Rating must be an integer")
    .min(1)
    .max(10)
    .optional(),
  notes: z.string().optional(),
});

export { addToWatchListSchema };
