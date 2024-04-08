/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { IBoilerPart } from '@/types/boilerparts'
import { formatPrice } from '@/utils/common'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { toggleCartItem } from '@/utils/shopping-cart'
import styles from '@/styles/catalog/index.module.scss'

import { removeShoppingCartItem, updateShoppingCart } from '@/lib/features/shopping-cart/shopping-cart'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { useState } from 'react'


const CatalogItem = ({ item }: { item: IBoilerPart }) => {
  const currentThemeMode: string = useAppSelector((state) => state.themeMode.mode)
  const darkModeClass = currentThemeMode === 'dark' ? `${styles.dark_mode}` : ''
  const user = useAppSelector((state) => state.user)
  const shoppingCart = useAppSelector((state) => state.shoppingCart.cartItems)
  const isInCart = shoppingCart.some((cartItem) => cartItem.partId === item.id)
  const [spinner, setSpinner] = useState(false)
  const dispatch = useAppDispatch()


  const toggleToCart = () => {
      toggleCartItem(user.username, item.id, isInCart, dispatch, removeShoppingCartItem, updateShoppingCart, setSpinner)
  }


  return (
    <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
      <img src={JSON.parse(item.images)[0]} alt={item.name} />
      <div className={styles.catalog__list__item__inner}>
        <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
          <h3 className={styles.catalog__list__item__title}>{item.name}</h3>
        </Link>
        <span className={styles.catalog__list__item__code}>
          Артикул: {item.vendor_code}
        </span>
        <span className={styles.catalog__list__item__price}>
          {formatPrice(item.price)} P
        </span>
      </div>
      <button
        className={`${styles.catalog__list__item__cart} ${
          isInCart ? styles.added : ''
        }`}
        disabled={spinner}
        onClick={toggleToCart}
      >
        {spinner ? (
          <div className={spinnerStyles.spinner} style={{ top: 6, left: 6 }} />
        ) : (
          <span>{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>
        )}
      </button>
    </li>
  )
}

export default CatalogItem
