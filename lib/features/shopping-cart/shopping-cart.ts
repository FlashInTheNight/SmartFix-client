import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { IShoppingCartItem } from '@/types/shopping-cart'

type ShoppingCartState = {
  cartItems: IShoppingCartItem[]
  totalPrice: number
  disableCart: boolean
}

const initialState: ShoppingCartState = {
  cartItems: [],
  totalPrice: 0,
  disableCart: false,
}

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    setShoppingCart: (state, action: PayloadAction<IShoppingCartItem[]>) => {
      state.cartItems = action.payload
    },
    updateShoppingCart: (state, action: PayloadAction<IShoppingCartItem>) => {
      state.cartItems.push(action.payload)
    },
    removeShoppingCartItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.partId !== action.payload
      )
    },
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload
    },
    setDisableCart: (state, action: PayloadAction<boolean>) => {
      state.disableCart = action.payload
    },
    updateCartItemTotalPrice: (
      state,
      action: PayloadAction<{ partId: number; total_price: number }>
    ) => {
      const item = state.cartItems.find(
        (item) => item.partId === action.payload.partId
      )
      if (item) {
        item.total_price = action.payload.total_price
      }
    },
    updateCartItemCount: (
      state,
      action: PayloadAction<{ partId: number; count: number }>
    ) => {
      const item = state.cartItems.find(
        (item) => item.partId === action.payload.partId
      )
      if (item) {
        item.count = action.payload.count
      }
    },
  },
})

export const {
  setShoppingCart,
  updateShoppingCart,
  removeShoppingCartItem,
  setTotalPrice,
  setDisableCart,
  updateCartItemTotalPrice,
  updateCartItemCount,
} = shoppingCartSlice.actions

export default shoppingCartSlice.reducer
