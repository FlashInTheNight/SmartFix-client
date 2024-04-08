'use client'
// import { useStore } from 'effector-react'
// import { removeFromCartFx } from '@/app/api/shopping-cart'
import { useEffect, useState } from 'react'
import { removeItemFromCart, updateTotalPrice } from '@/utils/shopping-cart'
import { ActionCreatorWithPayload, Dispatch } from '@reduxjs/toolkit'

export const usePrice = (
  count: number,
  partId: number,
  initialPrice: number,
  dispatch: Dispatch<any>,
  removeAction: ActionCreatorWithPayload<any>,
  updateAction: ActionCreatorWithPayload<any>
) => {
  const [spinner, setSpinner] = useState(false)

  // const spinner = useStore(removeFromCartFx.pending)
  const [price, setPrice] = useState(initialPrice)

  useEffect(() => {
    setPrice(price * count)
  }, [])

  // useEffect(() => {
  //   const data: Promise<any> = updateTotalPrice(price, partId)
  //   dispatch(updateAction({ partId, total_price: data.total_price }))
  // }, [price])


  const updatePrice = async () => {
    try {
      const data = await updateTotalPrice(price, partId);
      dispatch(updateAction({ partId, total_price: data.total_price }));
    } catch (error) {
      console.error(`Error updating price: ${error}`);
    }
  };
  
  useEffect(() => {
    updatePrice();
  }, [price]);

  const increasePrice = () => setPrice(price + initialPrice)
  const decreasePrice = () => setPrice(price - initialPrice)
  const deleteCartItem = () => {
      removeItemFromCart(partId, setSpinner)
      dispatch(removeAction(partId))
  }


  return { price, spinner, increasePrice, decreasePrice, deleteCartItem }
}
