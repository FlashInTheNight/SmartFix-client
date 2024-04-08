'use client'
import styles from '@/styles/about/index.module.scss'
import { useAppSelector } from '@/lib/hooks';

const AboutPage = () => {
  const currentThemeMode = useAppSelector((state) => state.themeMode.mode);
  const darkModeClass =
    currentThemeMode === "dark" ? `${styles.dark_mode}` : "";

  return (
    <section className={styles.about}>
      <div className="container">
        <h2 className={`${styles.about__title} ${darkModeClass}`}>
          О компании
        </h2>
        <div className={styles.about__inner}>
          <div className={`${styles.about__info} ${darkModeClass}`}>
            <p>
              Ваш надежный помощник в мире ремонта смартфонов, SmartFix
              предлагает широкий ассортимент запчастей для всех популярных
              моделей. От экранов и аккумуляторов до микросхем и камер — у нас
              есть всё, что может понадобиться для восстановления вашего
              устройства. С SmartFix ваш смартфон будет работать как новый!
            </p>
            <p>
              Вот несколько преимуществ, которые может предложить магазин
              запчастей для смартфонов SmartFix: Широкий ассортимент: Наличие
              запчастей для широкого спектра моделей смартфонов, от старых до
              самых последних новинок. Высокое качество: Только проверенные и
              сертифицированные комплектующие, обеспечивающие надежность и
              долговечность ремонта. Конкурентные цены: Предложение доступных
              цен благодаря прямым поставкам от производителей. Профессиональная
              поддержка: Опытные консультанты всегда готовы помочь в выборе
              нужной детали и предоставить советы по установке. Гарантия на
              запчасти: Предоставление гарантии на все приобретенные компоненты,
              что дает дополнительную уверенность в покупке. Удобство покупки:
              Легкий и понятный процесс заказа через интернет-магазин с быстрой
              доставкой. Эти преимущества могут сделать SmartFix привлекательным
              выбором для клиентов, ищущих надежные запчасти для своих
              смартфонов. 🛍️📲
            </p>
          </div>
          <div className={`${styles.about__img} ${styles.about__img__top}`}>
            <img src="/img/about-img.png" alt="image-1" />
          </div>
          <div className={`${styles.about__img} ${styles.about__img__bottom}`}>
            <img src="/img/about-img-2.png" alt="image-2" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage
