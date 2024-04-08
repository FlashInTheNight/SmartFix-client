"use client";

import PartTabs from "@/components/modules/PartPage/PartTabs";
import PartAccordion from "@/components/modules/PartPage/PartAccordion";

import PartImagesList from "@/components/modules/PartPage/PartImagesList";
import { useEffect, useState } from "react";
import { formatPrice } from "@/utils/common";
import CartHoverCheckedSvg from "@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg";
import CartHoverSvg from "@/components/elements/CartHoverSvg/CartHoverSvg";
import spinnerStyles from "@/styles/spinner/index.module.scss";
import { toggleCartItem } from "@/utils/shopping-cart";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import DashboardSlider from "@/components/modules/DashboardPage/DashboardSlider";
import styles from "@/styles/part/index.module.scss";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  useGetBoilerPartFxQuery,
  useGetBoilerPartsFxQuery,
} from "@/lib/features/api/boilerParts";
import { IBoilerPart } from "@/types/boilerparts";
import {
  removeShoppingCartItem,
  updateShoppingCart,
} from "@/lib/features/shopping-cart/shopping-cart";

const PartPage = ({ boilerPart }: { boilerPart: IBoilerPart }) => {
  const currentThemeMode = useAppSelector((state) => state.themeMode.mode);
  const darkModeClass =
    currentThemeMode === "dark" ? `${styles.dark_mode}` : "";
  const cartItems = useAppSelector((state) => state.shoppingCart.cartItems);
  const isInCart = cartItems.some((item) => item.partId === boilerPart.id);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(850);

  const [spinnerToggleCart, setSpinnerToggleCart] = useState(false);

  const { data: boilerParts, isLoading: spinnerSlider } =
    useGetBoilerPartsFxQuery("limit=20&offset=0");

  const toggleToCart = () =>
    toggleCartItem(
      user.username,
      boilerPart.id,
      isInCart,
      dispatch,
      removeShoppingCartItem,
      updateShoppingCart,
      setSpinnerToggleCart
    );

  return (
    <section>
      <div className="container">
        <div className={`${styles.part__top} ${darkModeClass}`}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>
            {boilerPart.name}
          </h2>
          <div className={styles.part__inner}>
            <PartImagesList boilerPart={boilerPart} />
            <div className={styles.part__info}>
              <span className={`${styles.part__info__price} ${darkModeClass}`}>
                {formatPrice(boilerPart.price || 0)} P
              </span>
              <span className={styles.part__info__stock}>
                {boilerPart.in_stock > 0 ? (
                  <span className={styles.part__info__stock__success}>
                    Есть на складе
                  </span>
                ) : (
                  <span className={styles.part__info__stock__not}>
                    Нет на складе
                  </span>
                )}
              </span>
              <span className={styles.part__info__code}>
                Артикул: {boilerPart.vendor_code}
              </span>
              <button
                className={`${styles.part__info__btn} ${
                  isInCart ? styles.in_cart : ""
                }`}
                onClick={toggleToCart}
              >
                {spinnerToggleCart ? (
                  <span
                    className={spinnerStyles.spinner}
                    style={{ top: 10, left: "45%" }}
                  />
                ) : (
                  <>
                    <span className={styles.part__info__btn__icon}>
                      {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
                    </span>
                    {isInCart ? (
                      <span>Добавлено в карзину</span>
                    ) : (
                      <span>Положить в корзину</span>
                    )}
                  </>
                )}
              </button>
              {!isMobile && <PartTabs boilerPart={boilerPart} />}
            </div>
          </div>
        </div>
        {isMobile && (
          <div className={styles.part__accordion}>
            <div className={styles.part__accordion__inner}>
              <PartAccordion title="Описание">
                <div
                  className={`${styles.part__accordion__content} ${darkModeClass}`}
                >
                  <h3
                    className={`${styles.part__tabs__content__title} ${darkModeClass}`}
                  >
                    {boilerPart.name}
                  </h3>
                  <p
                    className={`${styles.part__tabs__content__text} ${darkModeClass}`}
                  >
                    {boilerPart.description}
                  </p>
                </div>
              </PartAccordion>
            </div>
            <PartAccordion title="Совместимость">
              <div
                className={`${styles.part__accordion__content} ${darkModeClass}`}
              >
                <p
                  className={`${styles.part__tabs__content__text} ${darkModeClass}`}
                >
                  {boilerPart.compatibility}
                </p>
              </div>
            </PartAccordion>
          </div>
        )}
        <div className={styles.part__bottom}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>
            Вам понравится
          </h2>
          <DashboardSlider
            goToPartPage
            spinner={spinnerSlider}
            items={boilerParts?.rows || []}
          />
        </div>
      </div>
    </section>
  );
};

export default PartPage;
