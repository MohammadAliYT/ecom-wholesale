import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api/auth";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ["User", "Users", "Orders"],
  endpoints: (build) => ({
    // auth
    login: build.mutation<{ user?: any }, { email: string; password: string }>({
      query: (body) => ({ url: "/login", method: "POST", body }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation } = apiSlice;

// invalidatesTags: ["Users"]
// After deleting a user, everything labeled "Users" is stale → re-fetch it automatically.
