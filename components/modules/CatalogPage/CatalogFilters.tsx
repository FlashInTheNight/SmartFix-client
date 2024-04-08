'use client'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import CatalogFiltersMobile from './CatalogFiltersMobile'
import { ICatalogFiltersProps } from '@/types/catalog'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
// import {
//   $boilerManufacturers,
//   $partsManufacturers,
//   setBoilerManufacturersFromQuery,
//   setPartsManufacturersFromQuery,
// } from '@/context/boilerParts'
// setBoilerManufacturersFromQuery и setPartsManufacturersFromQuery необходимо переписать
import {
  setBoilerManufacturers,
  setPartsManufacturers,
} from '@/lib/features/boilerParts/boilerPartsSlice'
// import { useStore } from 'effector-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getQueryParamOnFirstRender } from '@/utils/common'
import {
  checkQueryParams,
  updateParamsAndFilters,
  updateParamsAndFiltersFromQuery,
} from '@/utils/catalog'
import { useAppSelector } from '@/lib/hooks'
import { Suspense } from "react";


const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilters,
  isPriceRangeChanged,
  currentPage,
  setIsFilterInQuery,
  closePopup,
  filtersMobileOpen,
  setQueryParams,
  refetch
}: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820)
  const [spinner, setSpinner] = useState(false)
  const boilerManufacturers = useAppSelector((state) => state.boilerParts.boilerManufacturers)
  const partsManufacturers = useAppSelector((state) => state.boilerParts.partsManufacturers)
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    applyFiltersFromQuery()
  }, [])

  const applyFiltersFromQuery = async () => {
    try {
      const {
        isValidBoilerQuery,
        isValidPartsQuery,
        isValidPriceQuery,
        partsQueryValue,
        priceFromQueryValue,
        boilerQueryValue,
        priceToQueryValue,
      } = checkQueryParams(searchParams)

      const boilerQuery = `&boiler=${getQueryParamOnFirstRender(
        'boiler',
        searchParams
      )}`
      const partsQuery = `&parts=${getQueryParamOnFirstRender('parts', searchParams)}`
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if (isValidBoilerQuery && isValidPartsQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          // dispatch(setBoilerManufacturersFromQuery(boilerQueryValue))
          // dispatch(setPartsManufacturersFromQuery(partsQueryValue))
        }, `${currentPage}${priceQuery}${boilerQuery}${partsQuery}`, refetch, setQueryParams)
        return
      }

      if (isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
        }, `${currentPage}${priceQuery}`, refetch, setQueryParams)
      }

      if (isValidBoilerQuery && isValidPartsQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          // setBoilerManufacturersFromQuery(boilerQueryValue)
          // setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${boilerQuery}${partsQuery}`, refetch, setQueryParams)
        return
      }

      if (isValidBoilerQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          // setBoilerManufacturersFromQuery(boilerQueryValue)
        }, `${currentPage}${boilerQuery}`, refetch, setQueryParams)
      }

      if (isValidPartsQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          // setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${partsQuery}`, refetch, setQueryParams)
      }

      if (isValidPartsQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          // setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${priceQuery}${partsQuery}`, refetch, setQueryParams)
      }

      if (isValidBoilerQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          // updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          // setBoilerManufacturersFromQuery(boilerQueryValue)
        }, `${currentPage}${priceQuery}${boilerQuery}`, refetch, setQueryParams)
      }
    } catch (error) {
      const err = error as Error

      if (err.message === 'URI malformed') {
        toast.warning('Неправильный url для фильтров')
        return
      }

      toast.error(err.message)
    }
  }

  const updatePriceFromQuery = (priceFrom: number, priisPriceRangeChangedeTo: number) => {
    setIsFilterInQuery(true)
    setPriceRange([+priceFrom, +priisPriceRangeChangedeTo]);
    setIsPriceRangeChanged(true)
  }

  const applyFilters = async () => {
    setIsFilterInQuery(true)
    try {
      setSpinner(true)
      const priceFrom = Math.ceil(priceRange[0])
      const priceTo = Math.ceil(priceRange[1])
      const priceQuery = isPriceRangeChanged
        ? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
        : ''
      const boilers = boilerManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title)
      const parts = partsManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title)
      const encodedBoilerQuery = encodeURIComponent(JSON.stringify(boilers))
      const encodedPartsQuery = encodeURIComponent(JSON.stringify(parts))
      const boilerQuery = `&boiler=${encodedBoilerQuery}`
      const partsQuery = `&parts=${encodedPartsQuery}`
      const initialPage = currentPage > 0 ? 0 : currentPage
      const limit = 20

      if (boilers.length && parts.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            boiler: encodedBoilerQuery,
            parts: encodedPartsQuery,
            priceFrom,
            priceTo,
            offset: initialPage,
            limit,
          },
          `${initialPage}${priceQuery}${boilerQuery}${partsQuery}`,
          searchParams,
          pathname,
          refetch,
          setQueryParams,
          router
        )
        return
      }

      if (isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            priceFrom,
            priceTo,
            limit,
            offset: initialPage,
          },
          `zalupa${initialPage}${priceQuery}`,
          searchParams,
          pathname,
          refetch,
          setQueryParams,
          router
        )
      }

      if (boilers.length && parts.length) {
        updateParamsAndFilters(
          {
            boiler: encodedBoilerQuery,
            parts: encodedPartsQuery,
            offset: initialPage,
            limit,
          },
          `${initialPage}${boilerQuery}${partsQuery}`,
          searchParams,
          pathname,
          refetch,
          setQueryParams,
          router
        )
        return
      }

      if (boilers.length) {
        updateParamsAndFilters(
          {
            boiler: encodedBoilerQuery,
            offset: initialPage,
            limit,
          },
          `${initialPage}${boilerQuery}`,
          searchParams,
          pathname,
          refetch,
          setQueryParams,
          router
        )
      }

      if (parts.length) {
        updateParamsAndFilters(
          {
            parts: encodedPartsQuery,
            offset: initialPage,
            limit,
          },
          `${initialPage}${partsQuery}`,
          searchParams,
          pathname,
          refetch,
          setQueryParams,
          router
        )
      }

      if (boilers.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            boiler: encodedBoilerQuery,
            priceFrom,
            priceTo,
            offset: initialPage,
            limit,
          },
          `${initialPage}${boilerQuery}${priceQuery}`,
          searchParams,
          pathname,
          refetch,
          setQueryParams,
          router
        )
      }

      if (parts.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            parts: encodedPartsQuery,
            priceFrom,
            priceTo,
            limit,
            offset: initialPage,
          },
          `${initialPage}${partsQuery}${priceQuery}`,
          searchParams,
          pathname,
          refetch,
          setQueryParams,
          router
        )
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <Suspense>
      {isMobile ? (
        <CatalogFiltersMobile
          closePopup={closePopup}
          spinner={spinner}
          applyFilters={applyFilters}
          priceRange={priceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          setPriceRange={setPriceRange}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetFilters}
          filtersMobileOpen={filtersMobileOpen}
        />
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
          resetFilters={resetFilters}
          applyFilters={applyFilters}
        />
      )}
    </Suspense>
  );
}

export default CatalogFilters
