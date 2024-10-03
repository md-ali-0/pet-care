import { baseApi } from "../../api/baseApi";

import { IPost, TResponseRedux } from "@/types";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => {
        return {
          url: `/posts`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["posts"],
    }),
    getAllPosts: builder.query({
      query: () => {
        return {
          url: `/posts/`,
        };
      },
      transformResponse: (response: TResponseRedux<IPost[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },

      providesTags: ["posts"],
    }),
    updatePost: builder.mutation({
      query: (data) => {
        return {
          url: `/posts/${data.id}`,
          method: "PATCH",
          body: data.data,
        };
      },
      invalidatesTags: ["posts"],
    }),
    deletePost: builder.mutation({
      query: (id) => {
        return {
          url: `/posts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postApi;
