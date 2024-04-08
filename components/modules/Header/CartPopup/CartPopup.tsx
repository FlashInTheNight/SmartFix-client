'use client'
import { forwardRef, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { AnimatePresence, motion } from 'framer-motion'
import { IWrappedComponentProps } from '@/types/common'
import { withClickOutside } from '@/utils/withClickOutside'
import ShoppingCartSvg from '@/components/elements/ShoppingCartSvg/ShoppingCartSvg'
// import { useStore } from 'effector-react'
// import { $mode } from '@/context/mode'
// import {
//   $disableCart,
//   $shoppingCart,
//   $totalPrice,
//   setShoppingCart,
//   setTotalPrice,
// } from '@/context/shopping-cart'
import CartPopupItem from './CartPopupItem'
import { getCartItemsFx } from '@/api/shopping-cart'
// import { $user } from '@/context/user'
import styles from '@/styles/cartPopup/index.module.scss'
import { formatPrice } from '@/utils/common'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import {useGetCartItemsQuery} from "@/lib/features/api/shopping-cart"
import { setShoppingCart, setTotalPrice } from "@/lib/features/shopping-cart/shopping-cart"

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const currentThemeMode = useAppSelector((state) => state.themeMode.mode)
    const darkModeClass = currentThemeMode === 'dark' ? `${styles.dark_mode}` : ''
    const dispatch = useAppDispatch()

    const user = useAppSelector((state) => state.user)
    // const { data: cartItems, isSuccess, refetch } = useGetCartItemsQuery(`/shopping-cart/${user.userId}`);

    const totalPrice =  useAppSelector((state) => state.shoppingCart.totalPrice)
    const disableCart = useAppSelector((state) => state.shoppingCart.disableCart)
    const shoppingCart = useAppSelector((state) => state.shoppingCart.cartItems)

    const toggleCartDropDown = () => {
      setOpen(!open)
    }

    useEffect(() => {
      loadCartItems()
    }, [])

    useEffect(() => {
      const reducedTotalPrice = shoppingCart.reduce((defaultCount, item) => defaultCount + item.total_price, 0)
      dispatch(setTotalPrice(reducedTotalPrice))
    }, [shoppingCart])

    const loadCartItems = async () => {
      try {
        if (!user.userId) return
        const cartItems = await getCartItemsFx(`/shopping-cart/${user.userId}`)

        dispatch(setShoppingCart(cartItems))

      } catch (error) {
        console.warn('error v cart popup', error)
        toast.error((error as Error).message)
      }
    }

    return (
      <div className={styles.cart} ref={ref}>
        {disableCart ? (
          <button
            className={`${styles.cart__btn} ${darkModeClass}`}
            style={{ cursor: 'auto' }}
          >
            <span className={styles.cart__svg}>
              <ShoppingCartSvg />
            </span>
            <span className={styles.cart__text}>Корзина</span>
          </button>
        ) : (
          <button
            className={`${styles.cart__btn} ${darkModeClass}`}
            onClick={toggleCartDropDown}
          >
            {!!shoppingCart.length && (
              <span className={styles.cart__btn__count}>
                {shoppingCart.length}
              </span>
            )}
            <span className={styles.cart__svg}>
              <ShoppingCartSvg />
            </span>
            <span className={styles.cart__text}>Корзина</span>
          </button>
        )}
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={`${styles.cart__popup} ${darkModeClass}`}
              style={{ transformOrigin: 'right top' }}
            >
              <h3 className={styles.cart__popup__title}>Корзина</h3>
              <ul className={styles.cart__popup__list}>
                {shoppingCart.length ? (
                  shoppingCart.map((item) => (
                    <CartPopupItem key={item.id} item={item} />
                  ))
                ) : (
                  <li className={styles.cart__popup__empty}>
                    <span
                      className={`${styles.cart__popup__empty__text} ${darkModeClass}`}
                    >
                      Корзина пуста
                    </span>
                  </li>
                )}
              </ul>
              <div className={styles.cart__popup__footer}>
                <div className={styles.cart__popup__footer__total}>
                  <span
                    className={`${styles.cart__popup__footer__text} ${darkModeClass}`}
                  >
                    Общая сумма заказа:
                  </span>
                  <span className={styles.cart__popup__footer__price}>
                    {formatPrice(totalPrice)} P
                  </span>
                </div>
                <Link href="/order" passHref legacyBehavior>
                  <button
                    className={styles.cart__popup__footer__btn}
                    disabled={!shoppingCart.length}
                  >
                    Оформить заказ
                  </button>
                </Link>
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

CartPopup.displayName = 'CartPopup'

export default withClickOutside(CartPopup)
