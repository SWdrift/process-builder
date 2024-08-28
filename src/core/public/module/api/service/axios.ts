import axios from "axios";
import { Request_URL } from "../setting/http";
import { ResultEnum } from "../enum/http";

const axiosInstance = axios.create({
    baseURL: Request_URL,
    timeout: ResultEnum.TIMEOUT
});

export default axiosInstance;
