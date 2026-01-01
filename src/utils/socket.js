
import io from "socket.io-client"
import { BASE_URL } from "./constants"

export const createSocketconnection = () => {
    if(location.hostname === "localhost"){
    return io (BASE_URL)     // backend Url -> "http://localhost:7777"
    }
    else{
        return io('/', {path : "/api/socket.io"})
    }
}