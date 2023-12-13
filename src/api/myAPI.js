import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const myAPI = createApi({
  reducerPath: 'Contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://633adcc0471b8c395576de6e.mockapi.io',
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => `/contacts/`,
      providesTags: ['Contacts'],
    }),
    deleteContactById: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Contacts'],
    }),
    postContact: builder.mutation({
      query: contact => ({
        url: '/contacts/',
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

const {
  useGetContactsQuery,
  useDeleteContactByIdMutation,
  usePostContactMutation,
} = myAPI;

export {
  myAPI,
  useGetContactsQuery,
  useDeleteContactByIdMutation,
  usePostContactMutation,
};
