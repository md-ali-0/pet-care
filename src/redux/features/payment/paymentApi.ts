import { TQueryParam, TResponseRedux } from "@/types";
import { IPayment } from "@/types/TPayment";
import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPayments: builder.query({
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
                    url: `/payment`,
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<IPayment[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },

            providesTags: ["payments"],
        }),
        cretePaymentIntent: builder.mutation({
            query: (data) => {
                return {
                    url: `/payment/create-payment-intent`,
                    body: data,
                    method: "POST",
                };
            },
        }),
        createPayment: builder.mutation({
            query: (data) => {
                return {
                    url: `/payment/create-payment`,
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["payments"],
        }),
        deletePayment: builder.mutation({
          query: (id) => {
            return {
              url: `/payment/${id}`,
              method: "DELETE",
            };
          },
          invalidatesTags: ["payments"],
        }),
    }),
});

export const {
    useGetAllPaymentsQuery,
    useCretePaymentIntentMutation,
    useCreatePaymentMutation,
    useDeletePaymentMutation
} = paymentApi;
