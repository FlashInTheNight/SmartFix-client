/* eslint-disable @next/next/no-img-element */
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import Link from 'next/link'
import type { IShoppingCartItem } from '@/types/shopping-cart'
import { usePrice } from '@/hooks/usePrice'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CartItemCounter from '@/components/elements/CartItemCounter/CartItemCounter'
import { formatPrice } from '@/utils/common' 
import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/order/index.module.scss'
import { removeShoppingCartItem, updateCartItemTotalPrice } from '@/lib/features/shopping-cart/shopping-cart'
const OrderItem = ({ item }: { item: IShoppingCartItem }) => {
  const currentThemeMode = useAppSelector((state) => state.themeMode.mode)
  const darkModeClass = currentThemeMode === 'dark' ? `${styles.dark_mode}` : ''
  const isMedia1160 = useMediaQuery(1160)
  const spinnerDarkModeClass =
  currentThemeMode === 'dark' ? '' : `${spinnerStyles.dark_mode}`

  const dispatch = useAppDispatch()

  const { price, spinner, decreasePrice, deleteCartItem, increasePrice } =
    usePrice(item.count, item.partId, item.price, dispatch, removeShoppingCartItem, updateCartItemTotalPrice)

  return (
    <li className={styles.order__cart__list__item}>
      <div className={styles.order__cart__list__item__left}>
        <div className={styles.order__cart__list__item__left__inner}>
          <div className={styles.order__cart__list__item__img}>
            <img src={item.image} alt={item.name} />
          </div>
          <Link href={`/catalog/${item.partId}`} passHref legacyBehavior>
            <a
              className={`${styles.order__cart__list__item__text} ${darkModeClass}`}
            >
              <span>
                {item.name.replace('.', '')}, {item.parts_manufacturer},{' '}
                {item.boiler_manufacturer}
              </span>
            </a>
          </Link>
        </div>
        {isMedia1160 &&
          (item.in_stock === 0 ? (
            <span className={styles.order__cart__list__item__empty}>
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
          ))}
      </div>
      <div className={styles.order__cart__list__item__right}>
        {!isMedia1160 &&
          (item.in_stock === 0 ? (
            <span className={styles.order__cart__list__item__empty}>
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
          ))}
        <span
          className={`${styles.order__cart__list__item__price} ${darkModeClass}`}
        >
          {formatPrice(price)} P
        </span>
        <button
          className={styles.order__cart__list__item__delete}
          onClick={deleteCartItem}
        >
          {spinner ? (
            <span
              className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
              style={{ top: '-13px', left: '-30px', width: 25, height: 25 }}
            />
          ) : (
            'Удалить'
          )}
        </button>
      </div>
    </li>
  )
}

export default OrderItem
