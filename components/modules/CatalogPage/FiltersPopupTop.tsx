import { IFiltersPopupTop } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'
import { useAppSelector } from '@/lib/hooks';

const FiltersPopupTop = ({
  title,
  resetBtnText,
  resetFilters,
  resetFilterBtnDisabled,
  closePopup,
}: IFiltersPopupTop) => {
  const currentThemeMode = useAppSelector((state) => state.themeMode.mode);
  const darkModeClass =
    currentThemeMode === "dark" ? `${styles.dark_mode}` : "";

  return (
    <div className={`${styles.catalog__bottom__filters__top} ${darkModeClass}`}>
      <button
        onClick={closePopup}
        className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}
      >
        {title}
      </button>
      <button
        className={styles.catalog__bottom__filters__reset}
        onClick={resetFilters}
        disabled={resetFilterBtnDisabled}
      >
        {resetBtnText}
      </button>
    </div>
  )
}

export default FiltersPopupTop
