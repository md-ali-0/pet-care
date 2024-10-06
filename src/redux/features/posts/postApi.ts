import { baseApi } from "../../api/baseApi";

import { TPost, TQueryParam, TResponseRedux } from "@/types";

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
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            if (item.value !== undefined) {
              params.append(item.name, item.value as string);
            }
          });
        }

        return {
          url: `/posts`,
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TPost[]>) => {
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
          method: "PUT",
          body: data.formData,
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
      invalidatesTags: ["posts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postApi;
