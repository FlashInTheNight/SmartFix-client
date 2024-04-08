"use client";
import DashboardSlider from "@/components/modules/DashboardPage/DashboardSlider";
import BrandsSlider from "@/components/modules/DashboardPage/BrandsSlider";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import type { IBoilerParts } from "@/types/boilerparts";
import styles from "@/styles/dashboard/index.module.scss";
import { useAppSelector } from "@/lib/hooks";
import { useGetBestsellersOrNewPartsFxQuery } from "@/lib/features/api/boilerParts";
import PromoSlider from "../modules/DashboardPage/PromoSlider";
import Image from "next/image";
import RobotPic from "@/public/img/robot_pic.png";
import DiscountSvg from "@/components/elements/DiscountSvg/DiscountSvg";
import PaymentSvg from "../elements/PaymentSvg/PaymentSvg";
import SupportSvg from "../elements/SupportSvg/SupportSvg";

const DashboardPage = () => {
  const currentThemeMode = useAppSelector((state) => state.themeMode.mode);
  const darkModeClass =
    currentThemeMode === "dark" ? `${styles.dark_mode}` : "";

  const {
    data: newParts,
    isFetching: newPartsSpinner,
    isError: isNewPartsError,
    error: newPartsError,
  } = useGetBestsellersOrNewPartsFxQuery("/boiler-parts/new");

  if (isNewPartsError) {
    toast.error((newPartsError as Error).message);
  }

  const {
    data: bestsellers,
    isFetching: bestsellersSpinner,
    isError: isBestsellersError,
    error: bestsellersError,
  } = useGetBestsellersOrNewPartsFxQuery("/boiler-parts/bestsellers");

  if (isBestsellersError) {
    toast.error((bestsellersError as Error).message);
  }

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <PromoSlider />
        <h1 className={`${styles.dashboard__title}`}>
          SmartFix - магазин по продаже запчастей для смартфонов
        </h1>
        <div
          className={`${styles.dashboard__parts} ${styles.dashboard__parts_first_item}`}
        >
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Хиты продаж
          </h3>
          <DashboardSlider
            items={bestsellers?.rows || []}
            spinner={bestsellersSpinner}
          />
        </div>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Новинки
          </h3>
          <DashboardSlider
            items={newParts?.rows || []}
            spinner={newPartsSpinner}
          />
        </div>
        <div className={styles.dashboard__brands}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Популярные производители
          </h3>
          <BrandsSlider />
        </div>
        <div className={styles.dashboard__about}>
          <h3
            className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}
          >
            Интернет-магазин запчастей для смартфонов «СмартФикс»
          </h3>
          <div className={styles.dashboard__about__info__container}>
            <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
              Ваш надежный помощник в мире ремонта смартфонов, <b>SmartFix</b>
              &nbsp;предлагает широкий ассортимент запчастей для всех популярных
              моделей. От экранов и аккумуляторов до микросхем и камер — у нас
              есть всё, что может понадобиться для восстановления вашего
              устройства. С SmartFix ваш смартфон будет работать как новый! 🛠️📱
            </p>
            <Image
              src={RobotPic}
              alt="robot"
              className={`${styles.dashboard__about__image}`}
            />
          </div>
          {/* benefits container */}
          <div className={styles.dashboard__about__benefits}>
            <div className={styles.dashboard__about__benefits__cards}>
              <div
                className={`${styles.dashboard__about__benefits__cards__item} ${darkModeClass}`}
              >
                <DiscountSvg
                  className={
                    styles.dashboard__about__benefits__cards__item__icon
                  }
                />
                <h5
                  className={
                    styles.dashboard__about__benefits__cards__item__title
                  }
                >
                  Постоянные акции и скидки
                </h5>
                <p
                  className={`${styles.dashboard__about__benefits__cards__item__descr}
                    ${darkModeClass}`}
                >
                  Мы рады удивлять наших клиентов неожиданными приятностями.
                  Чтобы всегда быть в курсе наших специальных акций и
                  предложений, рекомендуем вам подписаться на нашу новостную
                  рассылку.
                </p>
              </div>
              <div
                className={`${styles.dashboard__about__benefits__cards__item} ${darkModeClass}`}
              >
                <PaymentSvg
                  className={
                    styles.dashboard__about__benefits__cards__item__icon
                  }
                />
                <h5
                  className={
                    styles.dashboard__about__benefits__cards__item__title
                  }
                >
                  Мы предлагаем удобные способы оплаты.
                </h5>
                <p
                  className={`${styles.dashboard__about__benefits__cards__item__descr}
                    ${darkModeClass}`}
                >
                  Мы рады удивлять наших клиентов неожиданными приятностями.
                  Чтобы всегда быть в курсе наших специальных акций и
                  предложений, рекомендуем вам подписаться на нашу новостную
                  рассылку.
                </p>
              </div>
              <div
                className={`${styles.dashboard__about__benefits__cards__item} ${darkModeClass}`}
              >
                <SupportSvg
                  className={
                    styles.dashboard__about__benefits__cards__item__icon
                  }
                />
                <h5
                  className={
                    styles.dashboard__about__benefits__cards__item__title
                  }
                >
                  24/7 поддержка
                </h5>
                <p
                  className={`${styles.dashboard__about__benefits__cards__item__descr}
                    ${darkModeClass}`}
                >
                  Наши операторы всегда готовы помочь вам с любым вопросом или
                  проблемой. Мы ценим каждого клиента и стремимся предоставить
                  лучший сервис. Не стесняйтесь обращаться к нам в любое время!
                </p>
              </div>
            </div>
            <ul className={styles.dashboard__about__benefits__advantages}>
              <li
                className={styles.dashboard__about__benefits__advantages__item}
              >
                <span
                  className={
                    styles.dashboard__about__benefits__advantages__item__topic
                  }
                >
                  10 лет
                </span>
                <p
                  className={`${styles.dashboard__about__benefits__advantages__item__text} ${darkModeClass}`}
                >
                  на рынке
                </p>
              </li>
              {/* item 2 */}
              <li
                className={styles.dashboard__about__benefits__advantages__item}
              >
                <span
                  className={
                    styles.dashboard__about__benefits__advantages__item__topic
                  }
                >
                  100%
                </span>
                <p
                  className={`${styles.dashboard__about__benefits__advantages__item__text} ${darkModeClass}`}
                >
                  Гарантия на запчасти
                </p>
              </li>
              {/* item 3 */}
              <li
                className={styles.dashboard__about__benefits__advantages__item}
              >
                <span
                  className={
                    styles.dashboard__about__benefits__advantages__item__topic
                  }
                >
                  Цены
                </span>
                <p
                  className={`${styles.dashboard__about__benefits__advantages__item__text} ${darkModeClass}`}
                >
                  ниже чем у конкурентов
                </p>
              </li>
              {/* item 4 */}
              <li
                className={styles.dashboard__about__benefits__advantages__item}
              >
                <span
                  className={
                    styles.dashboard__about__benefits__advantages__item__topic
                  }
                >
                  4-6 дней
                </span>
                <p
                  className={`${styles.dashboard__about__benefits__advantages__item__text} ${darkModeClass}`}
                >
                  максимальная доставка
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
