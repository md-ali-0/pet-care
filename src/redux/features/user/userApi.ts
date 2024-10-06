import { baseApi } from "../../api/baseApi";

import { TQueryParam, TResponseRedux } from "@/types";
import { TUser } from "@/types/TUser";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => {
        return {
          url: `/users/me`,
        };
      },
      transformResponse: (response: TResponseRedux<TUser>) => {
        return response.data;
      },
      providesTags: ["userData"],
    }),
    getAllUsers: builder.query({
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
          url: `/users`,
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TUser[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },

      providesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: (data) => {
        return {
          url: `/users/${data.id}`,
          method: "PATCH",
          body: data.data,
        };
      },
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["users"],
    }),
    updateProfile: builder.mutation({
      query: (data) => {
        return {
          url: `/users/me`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["userData"],
    }),
    follow: builder.mutation({
      query: (followingId) => {
        return {
          url: `/users/follow`,
          method: "POST",
          body: followingId,
        };
      },
      invalidatesTags: ["users", "userData"],
    }),
    unfollow: builder.mutation({
      query: (followingId) => {
        return {
          url: `/users/unfollow`,
          method: "POST",
          body: followingId,
        };
      },
      invalidatesTags: ["users", "userData"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateProfileMutation,
  useUpdateUserMutation,
  useFollowMutation,
  useUnfollowMutation,
} = userApi;
