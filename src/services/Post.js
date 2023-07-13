// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const PostApi = createApi({
  reducerPath: "PostApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000",
    // headers: {
    //   "x-auth-token-user": localStorage.getItem("token"),
    // },
  }),
  endpoints: (builder) => ({
    getAllPostGoverner: builder.query({
      query: (name) => ({
        url: `admin/add-doc`,
        method: "post",
      }),
    }),
    getDashboardUserTotal: builder.query({
      query: (name) => ({
        url: `/adda/adge-dashboard`,
        method: "post",
      }),
    }),
    getAllPostHome: builder.query({
      query: (name) => ({
        url: `/adda/adge-home`,
        method: "post",
      }),
    }),
    userLogin: builder.mutation({
      query: (body) => {
        console.log("update login data", body);
        return {
          url: `/adda/adge-login`,
          method: "post",
          body,
        };
      },
    }),
    sendEmail: builder.mutation({
      query: (body) => {
        console.log("update login data", body);
        return {
          url: `user/user/user/send-mail`,
          method: "post",
          body,
        };
      },
    }),
    varifyOtp: builder.mutation({
      query: (body) => {
        console.log("update login data", body);
        return {
          url: `user/user/user/verify-otp`,
          method: "post",
          body,
        };
      },
    }),
    createForm: builder.mutation({
      query: (body) => {
        console.log("update address", body);
        return {
          url: `/adda/adge-add-form`,
          method: "post",
          body,
        };
      },
    }),
    viewDetails: builder.mutation({
      query: (body) => {
        const { id } = body;
        console.log("viewDetails id", id);
        return {
          url: `/admin/list/${id}`,
          method: "post",
        };
      },
    }),
    saveDraft: builder.mutation({
      query: (body) => {
        const { id } = body;
        console.log("viewDetails id", id);
        return {
          url: `/adda/save-draft/${id}`,
          method: "post",
        };
      },
    }),
    adgeHomeSubmit: builder.mutation({
      query: (body) => {
        const { id } = body;
        console.log("viewDetails id", id);
        return {
          url: `/adda/update-submit/${id}`,
          method: "post",
        };
      },
    }),
    updateDuplicate: builder.mutation({
      query: (body) => {
        console.log("update address", body);
        const { id, ...data } = body;
        console.log("update address body data", data);
        return {
          url: `/adda/adge-update-title/${id}`,
          method: "post",
          body: data,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useUserLoginMutation,
  useSendEmailMutation,
  useVarifyOtpMutation,
  useGetAllPostGovernerQuery,
  useGetAllPostHomeQuery,
  useGetDashboardUserTotalQuery,
  useCreateFormMutation,
  useViewDetailsMutation,
  useUpdateDuplicateMutation,
  useSaveDraftMutation,
  useAdgeHomeSubmitMutation,
} = PostApi;
