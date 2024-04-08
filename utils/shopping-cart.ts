import { toast } from 'react-toastify'
import {
  addToCartFx,
  removeFromCartFx,
  updateCartItemFx,
} from '@/api/shopping-cart'
import {
  removeShoppingCartItem,
  updateCartItemTotalPrice,
  updateShoppingCart,
} from '@/lib/features/shopping-cart/shopping-cart'
import type { Dispatch, SetStateAction } from 'react'
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'

export const toggleCartItem = async (
  username: string,
  partId: number,
  isInCart: boolean,
  dispatch: Dispatch<any>,
  removeAction: ActionCreatorWithPayload<any>,
  updateAction: ActionCreatorWithPayload<any>,
  setSpinner: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setSpinner(true)
    if (isInCart) {
      await removeFromCartFx(`/shopping-cart/one/${partId}`)
      dispatch(removeAction(partId))
      return
    }

    const data = await addToCartFx({
      url: '/shopping-cart/add',
      username,
      partId,
    })

    dispatch(updateAction(data))
  } catch (error) {
    toast.error((error as Error).message)
  } finally {
    setSpinner(false)
  }
}

export const removeItemFromCart = async (partId: number, setSpinner: Dispatch<SetStateAction<boolean>>) => {
  try {
    setSpinner(true)
    await removeFromCartFx(`/shopping-cart/one/${partId}`)
    // dispatch(removeShoppingCartItem(partId))
  } catch (error) {
    toast.error((error as Error).message)
  } finally {
    setSpinner(false)
  }
}

export const updateTotalPrice = async (total_price: number, partId: number) => {
  const data = await updateCartItemFx({
    url: `/shopping-cart/total-price/${partId}`,
    payload: { total_price },
  })

  return data
}
