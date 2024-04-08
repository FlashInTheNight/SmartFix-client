/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import PartImagesItem from './PartImagesItem'
import PartSlider from './PartSlider'
import styles from '@/styles/part/index.module.scss'
import type { IBoilerPart } from '@/types/boilerparts'

const PartImagesList = ({ boilerPart }: { boilerPart: IBoilerPart }) => {
  const isMobile = useMediaQuery(850);
  const images = boilerPart.images
    ? (JSON.parse(boilerPart.images) as string[])
    : [];
  const [currentImgSrc, setCurrentImgSrc] = useState("");

  return (
    <div className={styles.part__images}>
      {isMobile ? (
        <PartSlider images={images} />
      ) : (
        <>
          <div className={styles.part__images__main}>
            <img src={currentImgSrc || images[0]} alt={boilerPart.name} />
          </div>
          <ul className={styles.part__images__list}>
            {images.map((item, i) => (
              <PartImagesItem
                key={i}
                alt={`image-${i + 1}`}
                callback={setCurrentImgSrc}
                src={item}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PartImagesList
