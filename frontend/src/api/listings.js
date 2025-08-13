import { http } from "./http";

export const listingsApi = {
  list: () => http.get("/api/listings"),
  detail: (id) => http.get(`/api/listings/${id}`),
};
