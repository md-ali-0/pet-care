import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        cretePaymentIntent: builder.mutation({
            query: (data) => {
                return {
                    url: `/payment/create-payment-intent`,
                    body: data,
                    method: "POST"
                };
            },
        }),
        createPayment: builder.mutation({
            query: (data) => {
              return {
                url: `/payment/create-payment`,
                method: "POST",
                body: data
              };
            },
          }),
    }),
});

export const { useCretePaymentIntentMutation, useCreatePaymentMutation } = paymentApi;
