/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion'
import { useState } from 'react'
// import { useStore } from 'effector-react'
// import { $mode } from '@/context/mode'
// import { $boilerPart } from '@/context/boilerPart'
import styles from '@/styles/part/index.module.scss'
import { IBoilerPart } from '@/types/boilerparts';
import { useAppSelector } from '@/lib/hooks';

const PartTabs = ({ boilerPart }: { boilerPart: IBoilerPart }) => {
  const currentThemeMode = useAppSelector((state) => state.themeMode.mode);
  const darkModeClass =
    currentThemeMode === "dark" ? `${styles.dark_mode}` : "";
  const [showDescription, setShowDescription] = useState(true);
  const [showCompatibility, setShowCompatibility] = useState(false);

  const handleShowDescription = () => {
    setShowDescription(true);
    setShowCompatibility(false);
  };

  const handleShowCompatibility = () => {
    setShowDescription(false);
    setShowCompatibility(true);
  };

  return (
    <div className={styles.part__tabs}>
      <div className={`${styles.part__tabs__controls} ${darkModeClass}`}>
        <button
          className={showDescription ? styles.active : ""}
          onClick={handleShowDescription}
        >
          Описание
        </button>
        <button
          className={showCompatibility ? styles.active : ""}
          onClick={handleShowCompatibility}
        >
          Совместимость
        </button>
      </div>
      {showDescription && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.part__tabs__content}
        >
          <h3
            className={`${styles.part__tabs__content__title} ${darkModeClass}`}
          >
            {boilerPart.name}
          </h3>
          <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
            {boilerPart.description}
          </p>
        </motion.div>
      )}
      {showCompatibility && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.part__tabs__content}
        >
          <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
            {boilerPart.compatibility}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default PartTabs
