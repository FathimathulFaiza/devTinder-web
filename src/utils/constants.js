// src/utils/constants.js

export const BASE_URL = location.hostname === "localhost" 
    ? "http://localhost:7777"       // localhost
    : "https://devpartner.work";   // production
// export const BASE_URL = "/api"