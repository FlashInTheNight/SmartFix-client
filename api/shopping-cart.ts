import api from './axiosClient'
import { IAddToCartFx, IUpdateCartItemFx } from '@/types/shopping-cart'

export const getCartItemsFx = async (url: string) => {
  const { data } = await api.get(url)

  return data
}

export const addToCartFx = async ({ url, username, partId }: IAddToCartFx) => {
    const { data } = await api.post(url, { username, partId })

    return data
}


export const removeFromCartFx = async (url: string) => {
  await api.delete(url)
}

export const updateCartItemFx = async ({ url, payload }: IUpdateCartItemFx) => {
    const { data } = await api.patch(url, payload)

    return data
}

