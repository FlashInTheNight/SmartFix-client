/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import DeleteSvg from '@/components/elements/DeleteSvg/DeleteSvg'
import { IShoppingCartItem } from '../../../../types/shopping-cart'
import { formatPrice } from '@/utils/common'
import CartItemCounter from '@/components/elements/CartItemCounter/CartItemCounter'
import { usePrice } from '@/hooks/usePrice'
import styles from '@/styles/cartPopup/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { removeShoppingCartItem, updateCartItemTotalPrice } from '@/lib/features/shopping-cart/shopping-cart'

const CartPopupItem = ({ item }: { item: IShoppingCartItem }) => {
  const currentThemeMode = useAppSelector((state) => state.themeMode.mode)
  const darkModeClass = currentThemeMode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass =
    currentThemeMode === 'dark' ? '' : `${spinnerStyles.dark_mode}`

  const dispatch = useAppDispatch()

  const { price, spinner, decreasePrice, deleteCartItem, increasePrice } =
    usePrice(item.count, item.partId, item.price, dispatch, removeShoppingCartItem, updateCartItemTotalPrice)

  return (
    <li className={styles.cart__popup__list__item}>
      <div className={styles.cart__popup__list__item__top}>
        <div className={styles.cart__popup__list__item__img}>
          <img src={item.image} alt={item.name} />
        </div>
        <Link href={`/catalog/${item.partId}`} passHref legacyBehavior>
          <a
            className={`${styles.cart__popup__list__item__text} ${darkModeClass}`}
          >
            <span>
              {item.name.replace('.', '')}, {item.parts_manufacturer},{' '}
              {item.boiler_manufacturer}
            </span>
          </a>
        </Link>
        <button onClick={deleteCartItem}>
          <span>
            {spinner ? (
              <span
                className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
                style={{ top: 0, left: 0, width: 20, height: 20 }}
              />
            ) : (
              <DeleteSvg />
            )}
          </span>
        </button>
      </div>
      <div className={styles.cart__popup__list__item__bottom}>
        {item.in_stock === 0 ? (
          <span className={styles.cart__popup__list__item__empty}>
            Нет на складе
          </span>
        ) : (
          <CartItemCounter
            totalCount={item.in_stock}
            partId={item.partId}
            initialCount={item.count}
            increasePrice={increasePrice}
            decreasePrice={decreasePrice}
          />
        )}
        <span
          className={`${styles.cart__popup__list__item__price} ${darkModeClass}`}
        >
          {formatPrice(price)} P
        </span>
      </div>
    </li>
  )
}

export default CartPopupItem
