import Link from 'next/link'
import CrumbArrowSvg from '@/components/elements/CrumbArrowSvg/CrumbArrowSvg'
import { ICrumbProps } from '@/types/common'
import styles from '@/styles/breadcrumbs/index.module.scss'
import { useAppSelector } from '@/lib/hooks'

const Crumb = ({ translatedItem, routeItem, last = false }: ICrumbProps) => {
  const currentThemeMode = useAppSelector((state) => state.themeMode.mode);
  const darkModeClass =
    currentThemeMode === "dark" ? `${styles.dark_mode}` : "";

  if (last) {
    return (
      <a>
        <span
          className={`${styles.breadcrumbs__item__icon} ${darkModeClass}`}
          style={{ marginRight: 13 }}
        >
          <CrumbArrowSvg />
        </span>
        <span className={`last-crumb ${styles.breadcrumbs__item__text}`}>
          {translatedItem}
        </span>
      </a>
    );
  }

  return (
    <Link href={`/${routeItem}`} passHref legacyBehavior>
      <a>
        <span
          className={`${styles.breadcrumbs__item__icon} ${darkModeClass}`}
          style={{ marginRight: 13 }}
        >
          <CrumbArrowSvg />
        </span>
        <span className={styles.breadcrumbs__item__text}>{translatedItem}</span>
      </a>
    </Link>
  );
};

export default Crumb
