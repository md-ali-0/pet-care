import { baseApi } from "../../api/baseApi";

const premiumApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkPremiumAvailable: builder.mutation({
      query: (id) => {
        return {
          url: `/premium/check-premium-available/${id}`,
          method: "POST",
        };
      },
    }),
  }),
});

export const { useCheckPremiumAvailableMutation } = premiumApi;
