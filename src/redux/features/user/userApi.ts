import { baseApi } from "../../api/baseApi";

import { TResponseRedux } from "@/types";
import { TUser } from "@/types/TUser";

const userApi = baseApi.injectEndpoints({
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
      query: () => {
        return {
          url: `/users/`,
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
  }),
});

export const {
  useGetMeQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateProfileMutation,
  useUpdateUserMutation,
} = userApi;
