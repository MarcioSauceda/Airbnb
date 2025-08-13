import { http } from "./http";

export const authApi = {
  login: (email, password) => http.post("/api/users/login", { email, password }),
  register: (payload) => http.post("/api/users/register", payload),
  me: () => http.get("/api/users/me"), // cuando agreguemos el endpoint
};
