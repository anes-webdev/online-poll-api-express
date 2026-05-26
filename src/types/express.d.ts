import type { Poll, User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user: User;
      poll: Poll;
    }
  }
}

export {};
