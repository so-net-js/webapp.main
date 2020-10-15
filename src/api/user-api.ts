import axios, { AxiosInstance } from "axios";
import store from "@/store";

export class UserServiceApi {
  static getUnauthorized(): AxiosInstance {
    return axios.create({
      baseURL: "http://localhost:9090",
    });
  }

  static getAuthorized(): AxiosInstance {
    return axios.create({
      baseURL: "http://localhost:9090",
      headers: {
        authjwt: store.state.auth.jwt,
      },
    });
  }
}
