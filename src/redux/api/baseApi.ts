import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { siteConfig } from "@/config/site";

const baseQuery = fetchBaseQuery({
  baseUrl: `${siteConfig.host}/api`,
  credentials: "include",
  prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken')

      if (token) {
          headers.set("authorization", `${token}`);
      }
      return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: ["posts", "auth", "users", "comments", "payments", "userData"],
});
