import type { Server as HttpServer } from "http";
import { Server } from "socket.io";

let io: Server;

const pollRoom = (pollId: string) => `poll:${pollId}`;

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("join-poll", (pollId: string) => {
      socket.join(pollRoom(pollId));
    });

    socket.on("leave-poll", (pollId: string) => {
      console.log('user left');
      socket.leave(pollRoom(pollId));
    });
  });

  return io;
};

export const emitNewVote = (pollId: string, vote: any) => {
  io.to(pollRoom(pollId)).emit("new-vote", vote);
};
