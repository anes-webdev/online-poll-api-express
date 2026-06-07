import type { PollWithVotes } from "../types/poll.types.js";

export const formatPollVotesResponse = (poll: PollWithVotes) => {
  const pollOptions = poll.options.map((option) => {
    const participants = option.votes.map((vote) => ({
      id: vote.participant.id,
      name: vote.participant.name,
    }));
    return {
      id: option.id,
      name: option.name,
      participants,
    };
  });

  const pollParticipants = poll.participants.map((participant) => {
    const choices = participant.votes.map((vote) => ({
      id: vote.option.id,
      name: vote.option.name,
    }));
    return {
      id: participant.id,
      name: participant.name,
      choices,
    };
  });

  return {
    ...poll,
    options: pollOptions,
    participants: pollParticipants,
  };
};
