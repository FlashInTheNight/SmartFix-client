'use client'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { setShoppingCart } from '@/lib/features/shopping-cart/shopping-cart'
import { useAppSelector } from '@/lib/hooks'

import { formatPrice } from '@/utils/common'
import OrderAccordion from '@/components/modules/OrderPage/OrderAccordion'

import { removeFromCartFx } from '@/api/shopping-cart'
import { checkPaymentFx, makePaymentFx } from '@/api/payment'

import styles from '@/styles/order/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
const OrderPage = () => {
  const currentThemeMode = useAppSelector((state) => state.themeMode.mode)
  const darkModeClass = currentThemeMode === 'dark' ? `${styles.dark_mode}` : ''
  const user = useAppSelector((state) => state.user.username);
  const userCity = useAppSelector((state) => state.user.city)
  const userStreet = useAppSelector((state) => state.user.street)
  const userId = useAppSelector((state) => state.user.userId)
  const shoppingCart = useAppSelector((state) => state.shoppingCart.cartItems)
  const totalPrice = useAppSelector((state) => state.shoppingCart.totalPrice)

  const [orderIsReady, setOrderIsReady] = useState(false)
  const [agreement, setAgreement] = useState(false)

  const [spinner, setSpinner] =  useState(false)
  const router = useRouter()

  const handleAgreementChange = () => setAgreement(!agreement)

  useEffect(() => {
    const paymentId = sessionStorage.getItem('paymentId')

    if (paymentId) {
      checkPayment(paymentId)
    }
  }, [])

  const makePay = async () => {
    try {
      setSpinner(true)
      const data = await makePaymentFx({
        url: '/payment',
        amount: totalPrice,
        description: `Заказ №1 ${
          userCity && userStreet
            ? `Город: ${userCity}, улица: ${userStreet}`
            : ''
        }`,
      })

      sessionStorage.setItem('paymentId', data.id)
      router.push(data.confirmation.confirmation_url)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const checkPayment = async (paymentId: string) => {
    try {
      const data = await checkPaymentFx({
        url: '/payment/info',
        paymentId,
      })

      if (data.status === 'succeeded') {
        resetCart()
        return
      }

      sessionStorage.removeItem('paymentId')
    } catch (error) {
      console.log((error as Error).message)
      resetCart()
    }
  }

  const resetCart = async () => {
    sessionStorage.removeItem('paymentId')
    await removeFromCartFx(`/shopping-cart/all/${userId}`);
    setShoppingCart([])
  }

  return (
    <section className={styles.order}>
      <div className="container">
        <h2 className={`${styles.order__title} ${darkModeClass}`}>
          Оформление заказа
        </h2>
        <div className={styles.order__inner}>
          <div className={styles.order__cart}>
            <OrderAccordion
              setOrderIsReady={setOrderIsReady}
              showDoneIcon={orderIsReady}
            />
          </div>
          <div className={styles.order__pay}>
            <h3 className={`${styles.order__pay__title} ${darkModeClass}`}>
              Итого
            </h3>
            <div className={`${styles.order__pay__inner} ${darkModeClass}`}>
              <div className={styles.order__pay__goods}>
                <span>
                  Товары (
                  {shoppingCart.reduce(
                    (defaultCount, item) => defaultCount + item.count,
                    0
                  )}
                  )
                </span>
                <span>{formatPrice(totalPrice)} P</span>
              </div>
              <div className={styles.order__pay__total}>
                <span>На сумму</span>
                <span className={darkModeClass}>
                  {formatPrice(totalPrice)} P
                </span>
              </div>
              <button
                disabled={!(orderIsReady && agreement)}
                className={styles.order__pay__btn}
                onClick={makePay}
              >
                {spinner ? (
                  <span
                    className={spinnerStyles.spinner}
                    style={{ top: '6px', left: '47%' }}
                  />
                ) : (
                  'Подтвердить заказ'
                )}
              </button>
              <label
                className={`${styles.order__pay__rights} ${darkModeClass}`}
              >
                <input
                  className={styles.order__pay__rights__input}
                  type="checkbox"
                  onChange={handleAgreementChange}
                  checked={agreement}
                />
                <span className={styles.order__pay__rights__text}>
                  <strong>Согласен с условиями</strong> Правил пользования
                  торговой площадкой и правилами возврата
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderPage
