// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IAddToCartFx, IUpdateCartItemFx } from '@/types/shopping-cart'
import { apiSlice } from './apiSlice'


export const shoppingCartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query({
      query: (url: string) => url,
    }),
    addToCart: builder.mutation({
      query: ({ url, username, partId }: IAddToCartFx) => ({
        url,
        method: 'POST',
        body: { username, partId },
      }),
    }),
    removeFromCart: builder.mutation({
      query: (url: string) => ({
        url,
        method: 'DELETE',
      }),
    }),
    updateCartItem: builder.mutation({
      query: ({ url, payload }: IUpdateCartItemFx) => ({
        url,
        method: 'PATCH',
        body: payload,
      }),
    }),
  }),
})

export const {
  useGetCartItemsQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartItemMutation,
} = shoppingCartApi
