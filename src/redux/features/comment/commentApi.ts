import { baseApi } from "../../api/baseApi";

import { TComment, TQueryParam, TResponseRedux } from "@/types";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (data) => {
        return {
          url: `/comment`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["comments", "posts"],
    }),
    getAllComments: builder.query({
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
          url: `/comment`,
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TComment[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },

      providesTags: ["comments"],
    }),
    updateComment: builder.mutation({
      query: (data) => {
        return {
          url: `/comment/${data.id}`,
          method: "PUT",
          body: data.data,
        };
      },
      invalidatesTags: ["comments", "posts"],
    }),
    deleteComment: builder.mutation({
      query: (id) => {
        return {
          url: `/comment/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["comments", "posts"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetAllCommentsQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentApi;
