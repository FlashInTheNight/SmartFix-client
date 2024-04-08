'use client'
import { useGetBoilerPartsFxQuery } from '@/lib/features/api/boilerParts'

import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'

import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { setBoilerManufacturers, setBoilerParts, setPartsManufacturers } from '@/lib/features/boilerParts/boilerPartsSlice'

import styles from '@/styles/catalog/index.module.scss'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import ReactPaginate from 'react-paginate'
import { usePathname, useRouter } from 'next/navigation'
import { IBoilerPart, IBoilerParts } from '@/types/boilerparts'
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters'
import { usePopup } from '@/hooks/usePoup'
import FilterSvg from '@/components/elements/FilterSvg/FilterSvg'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import { useSearchParams } from 'next/navigation'
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock'
import { updateBoilerManufacturer } from '@/lib/features/boilerParts/boilerPartsSlice'
import { Suspense } from "react";

const CatalogPage = () => {
  const currentThemeMode: string = useAppSelector((state) => state.themeMode.mode)
  const darkModeClass = currentThemeMode === 'dark' ? `${styles.dark_mode}` : ''
  const dispatch = useAppDispatch();

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const offsetQuery = searchParams.get('offset')

  const [priceRange, setPriceRange] = useState([500, 12000])
  const [isFilterInQuery, setIsFilterInQuery] = useState(false)
  const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)

  const [ queryParams, setQueryParams ] = useState('limit=20&offset=0')
  const { data: boilerParts, isFetching, isError, isSuccess, isLoading, refetch} = useGetBoilerPartsFxQuery(queryParams)
  
  const pagesCount = Math.ceil((isSuccess ? boilerParts.count : 0) / 20)
  const isValidOffset =
  offsetQuery && !isNaN(+offsetQuery) && +offsetQuery > 0
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +offsetQuery - 1 : 0
  )
  const { toggleOpen, open, closePopup } = usePopup()

  const boilerManufacturers = useAppSelector((state) => state.boilerParts.boilerManufacturers)
  const partsManufacturers = useAppSelector((state) => state.boilerParts.partsManufacturers)

  const isAnyBoilerManufacturerChecked = boilerManufacturers.some(
    (item) => item.checked
  )
  const isAnyPartsManufacturerChecked = partsManufacturers.some(
    (item) => item.checked
  )

  const resetFilterBtnDisabled = !(
    isPriceRangeChanged ||
    isAnyBoilerManufacturerChecked ||
    isAnyPartsManufacturerChecked
  )

  useEffect(() => {
    loadBoilerParts()
  }, [])


  const loadBoilerParts = async () => {
    try {
      await refetch();

      if (!isValidOffset) {
        const queryOffsetOne = new URLSearchParams(searchParams.toString())
        queryOffsetOne.set('offset', '1')
   
        router.replace(`${pathname}/?${queryOffsetOne}`);

        resetPagination()
        return
      }
      
      if (isValidOffset) {
        if (+offsetQuery > Math.ceil(isSuccess ? boilerParts.count : 0 / 20)) {

          const queryOffsetOne = new URLSearchParams(searchParams.toString())
          queryOffsetOne.set('offset', '1')

          router.push(
            `${pathname}?${queryOffsetOne}`,
          );

          resetPagination()

          return
        }

        const offset = +offsetQuery - 1

        setCurrentPage(offset)

        await setQueryParams(`limit=20&offset=${offset}`)
        await refetch();

        return
      }

      resetPagination()

    } catch (error) {
      toast.error((error as Error).message)
      console.error('pizda v etom meste', error)
    }
  }

  const resetPagination = async () => {
    setCurrentPage(0)
    setQueryParams(`limit=20&offset=${currentPage}`)
    await refetch()
  }

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      if (selected > pagesCount) {
        resetPagination()
        return
      }

      if (isValidOffset && +offsetQuery > Math.ceil((isSuccess ? boilerParts.count : 0) / 2)) {
        resetPagination()
        return
      }
      setQueryParams(`limit=20&offset=${selected}`);

      await refetch();

      const newOffsetQueries = new URLSearchParams(searchParams.toString())
      const currentPage = (selected + 1).toString()
      newOffsetQueries.set('offset', currentPage)


      router.push(`${pathname}?${newOffsetQueries}`);

      setCurrentPage(selected)
    } catch (error) {
      console.warn(`V ${handlePageChange} эта ёбанная ошибка`)
      console.warn(error)
      toast.error((error as Error).message)
    }
  }

  const resetFilters = async () => {
    try {
      await setQueryParams(`limit=20&offset=0`)
      await refetch()

      const params = new URLSearchParams(searchParams.toString())

      params.delete('boiler')
      params.delete('parts')
      params.delete('priceFrom')
      params.delete('priceTo')

      params.set('first', 'cheap')
      router.push(`${pathname}?${params.toString()}`)
    
      setBoilerManufacturers(
        boilerManufacturers.map((item) => ({ ...item, checked: false }))
      )

      setPartsManufacturers(
        partsManufacturers.map((item) => ({ ...item, checked: false }))
      )

      setPriceRange([500, 12000])
      setIsPriceRangeChanged(false)
    } catch (error) {
      console.warn(error as Error)
      toast.error((error as Error).message)
    }
  }

  return (
    <Suspense>
      <section className={styles.catalog}>
        <div className={`container ${styles.catalog__container}`}>
          <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
            Каталог товаров
          </h2>
          <div className={`${styles.catalog__top} ${darkModeClass}`}>
            <AnimatePresence>
              {isAnyBoilerManufacturerChecked && (
                <ManufacturersBlock
                  title="Производитель котлов:"
                  event={updateBoilerManufacturer}
                  manufacturersList={boilerManufacturers}
                />
              )}
            </AnimatePresence>
            <div className={styles.catalog__top__inner}>
              <button
                className={`${styles.catalog__top__reset} ${darkModeClass}`}
                disabled={resetFilterBtnDisabled}
                onClick={resetFilters}
              >
                Сбросить фильтр
              </button>
              <button
                className={styles.catalog__top__mobile_btn}
                onClick={toggleOpen}
              >
                <span className={styles.catalog__top__mobile_btn__svg}>
                  <FilterSvg />
                </span>
                <span className={styles.catalog__top__mobile_btn__text}>
                  Фильтр
                </span>
              </button>
              <FilterSelect
                setQueryParams={setQueryParams}
                refetch={refetch}
                setSpinner={isFetching}
              />
            </div>
          </div>
          <div className={styles.catalog__bottom}>
            <div className={styles.catalog__bottom__inner}>
              <CatalogFilters
                priceRange={priceRange}
                setIsPriceRangeChanged={setIsPriceRangeChanged}
                setPriceRange={setPriceRange}
                resetFilterBtnDisabled={resetFilterBtnDisabled}
                resetFilters={resetFilters}
                isPriceRangeChanged={isPriceRangeChanged}
                currentPage={currentPage}
                setIsFilterInQuery={setIsFilterInQuery}
                closePopup={closePopup}
                filtersMobileOpen={open}
                setQueryParams={setQueryParams}
                refetch={refetch}
              />
              {isFetching ? (
                <ul className={skeletonStyles.skeleton}>
                  {Array.from(new Array(20)).map((_, i) => (
                    <li
                      key={i}
                      className={`${skeletonStyles.skeleton__item} ${
                        currentThemeMode === "dark"
                          ? `${skeletonStyles.dark_mode}`
                          : ""
                      }`}
                    >
                      <div className={skeletonStyles.skeleton__item__light} />
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className={styles.catalog__list}>
                  {boilerParts && boilerParts.rows?.length ? (
                    boilerParts.rows.map((item: IBoilerPart) => (
                      <CatalogItem item={item} key={item.id} />
                    ))
                  ) : (
                    <span>Список товаров пуст...</span>
                  )}
                </ul>
              )}
            </div>
            <ReactPaginate
              containerClassName={styles.catalog__bottom__list}
              pageClassName={styles.catalog__bottom__list__item}
              pageLinkClassName={styles.catalog__bottom__list__item__link}
              previousClassName={styles.catalog__bottom__list__prev}
              nextClassName={styles.catalog__bottom__list__next}
              breakClassName={styles.catalog__bottom__list__break}
              breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
              breakLabel="..."
              pageCount={pagesCount}
              forcePage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </Suspense>
  );
}

export default CatalogPage
