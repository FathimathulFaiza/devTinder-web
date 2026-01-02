import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.MODE === "production"
    ? "http://devpartner.work:7777" // Change https to http and add :7777
    : "http://localhost:7777";

export const createSocketconnection = () => {
  return io(SOCKET_URL, {
    withCredentials: true,
  });
};