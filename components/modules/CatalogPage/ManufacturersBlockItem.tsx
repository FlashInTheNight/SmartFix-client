import { motion } from 'framer-motion'
import {
  IFilterCheckboxItem,
  IManufacturersBlockItemProps,
} from '@/types/catalog'
import DeleteSvg from '@/components/elements/DeleteSvg/DeleteSvg'
import styles from '@/styles/catalog/index.module.scss'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'

const ManufacturersBlockItem = ({
  item,
  event,
}: IManufacturersBlockItemProps) => {
  const currentThemeMode = useAppSelector((state) => state.themeMode.mode)
  const darkModeClass = currentThemeMode === 'dark' ? `${styles.dark_mode}` : ''

  const dispatch = useAppDispatch()

  const removeFilter = () => {
    dispatch(event({ checked: !item.checked, id: item.id } as IFilterCheckboxItem))
  }

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${styles.manufacturers__list__item} ${darkModeClass}`}
    >
      <span className={styles.manufacturers__list__item__text}>
        {item.title}
      </span>
      <button
        className={styles.manufacturers__list__item__btn}
        onClick={removeFilter}
      >
        <span>
          <DeleteSvg />
        </span>
      </button>
    </motion.li>
  )
}

export default ManufacturersBlockItem
