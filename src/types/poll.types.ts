import type { Prisma } from "@prisma/client";

export type CreatePollBody = {
  title: string;
  description: string;
  options: {
    optionName: string;
  }[];
};

export const pollVotesQueryArgs = {
  include: {
    options: {
      select: {
        id: true,
        optionName: true,
        votes: {
          select: { participant: { select: { id: true, name: true } } },
        },
      },
    },
    participants: {
      select: {
        id: true,
        name: true,
        votes: {
          select: { option: { select: { id: true, optionName: true } } },
        },
      },
    },
  },
} satisfies Pick<Prisma.PollFindUniqueArgs, "include">;

export type PollWithVotes = Prisma.PollGetPayload<typeof pollVotesQueryArgs>;
