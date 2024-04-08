import { useAppSelector } from '@/lib/hooks'
import type { IFilterCheckboxItem } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'
import { useAppDispatch } from '@/lib/hooks'

const FilterCheckboxItem = ({
  title,
  checked,
  id,
  event,
}: IFilterCheckboxItem) => {
  const currentThemeMode = useAppSelector((state) => state.themeMode.mode)
  const darkModeClass = currentThemeMode === 'dark' ? `${styles.dark_mode}` : ''

  const dispatch = useAppDispatch()

  const handleFilterChange = () => {
    dispatch(event({ checked: !checked, id } as IFilterCheckboxItem))
  }
  return (
    <li
      className={`${styles.filters__manufacturer__list__item} ${darkModeClass}`}
    >
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleFilterChange}
        />
        <span>{title}</span>
      </label>
    </li>
  )
}

export default FilterCheckboxItem
