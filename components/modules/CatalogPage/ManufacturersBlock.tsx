import { AnimatePresence, motion } from 'framer-motion'
import { IManufacturersBlockProps } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'
import ManufacturersBlockItem from './ManufacturersBlockItem'
import { useAppSelector } from '@/lib/hooks'


const ManufacturersBlock = ({
  title,
  manufacturersList,
  event,
}: IManufacturersBlockProps) => {
  const currentThemeMode = useAppSelector((state) => state.themeMode.mode)
  const darkModeClass = currentThemeMode === 'dark' ? `${styles.dark_mode}` : ''

  const checkedItems = manufacturersList.filter((item) => item.checked)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${styles.manufacturers} ${darkModeClass}`}
    >
      <h3 className={`${styles.manufacturers__title} ${darkModeClass}`}>
        {title}
      </h3>
      <ul className={styles.manufacturers__list}>
        <AnimatePresence>
          {checkedItems.map((item) => (
            <ManufacturersBlockItem key={item.id} item={item} event={event} />
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  )
}

export default ManufacturersBlock
