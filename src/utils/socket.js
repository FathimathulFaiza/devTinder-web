import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.MODE === "production"
    ? "https://devpartner.work:7777" // Change httpss and add :7777
    : "http://localhost:7777";

export const createSocketconnection = () => {
  return io(SOCKET_URL, {
    withCredentials: true,
  });
};