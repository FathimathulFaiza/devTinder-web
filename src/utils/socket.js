// utils/socket.js (frontend)
import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.MODE === "production"
    ? "https://devpartner.work"
    : "http://localhost:7777";

export const createSocketconnection = () => {
  return io(SOCKET_URL, {
    withCredentials: true,
  });
};