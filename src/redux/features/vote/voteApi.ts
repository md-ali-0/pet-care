import { baseApi } from "../../api/baseApi";

const voteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    upvote: builder.mutation({
      query: (data) => {
        return {
          url: `/vote/upvote`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["posts"],
    }),
    downvote: builder.mutation({
      query: (data) => {
        return {
          url: `/vote/downvote`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["posts"],
    }),
  }),
});

export const { useUpvoteMutation, useDownvoteMutation } = voteApi;
