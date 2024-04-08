'use client'
import {  useRouter } from 'next/navigation'
import { getQueryParamOnFirstRender, idGenerator } from './common'
// import { getBoilerPartsFx } from '@/app/api/boilerParts'
// import { setFilteredBoilerParts } from '@/context/boilerParts'
import { useGetBoilerPartsFxQuery } from '@/lib/features/api/boilerParts'
import { setFilteredBoilerParts } from '@/lib/features/boilerParts/boilerPartsSlice'
import type { useSearchParams } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Dispatch, SetStateAction } from 'react'


export type searchParams = ReturnType<typeof useSearchParams>


const createManufacturerCheckboxObj = (title: string) => ({
  title,
  checked: false,
  id: idGenerator(),
})

export const boilerManufacturers = [
  "ElectroCore",
  "CircuitMaster",
  "QuantumChip",
  "NanoTech",
  "SiliconStream Solutions",
  "InfiniteCircuitry",
  "PrecisionParts Electronics",
  "TechGrid Accessories",
  "ComponentCrafters",
].map(createManufacturerCheckboxObj);

export const partsManufacturers = [
  "Микросхемы (чипы)",
  "Транзисторы",
  "Резисторы",
  "Конденсаторы",
  "Индуктивные катушки",
  "Диоды",
  "Светодиоды (LED)",
  "Кварцевые резонаторы",
  "стабилизаторы напряжения",
  "Печатные платы (PCB)",
].map(createManufacturerCheckboxObj);



const checkPriceFromQuery = (price: number) =>
  price && !isNaN(price) && price >= 0 && price <= 10000

export const checkQueryParams = (searchParams: searchParams) => {
  const priceFromQueryValue = getQueryParamOnFirstRender(
    'priceFrom',
    searchParams
  ) as string

  const priceToQueryValue = getQueryParamOnFirstRender(
    'priceTo',
    searchParams
  ) as string

  const boilerQueryValueQueryCheck = getQueryParamOnFirstRender('boiler', searchParams) as string;
  const boilerQueryValue = boilerQueryValueQueryCheck ? boilerQueryValueQueryCheck : '';

  const partsQueryValueQueryCheck = getQueryParamOnFirstRender('parts', searchParams) as string;
  const partsQueryValue = partsQueryValueQueryCheck ? partsQueryValueQueryCheck : '';

  const isValidBoilerQuery = !!boilerQueryValue
  const isValidPartsQuery = !!partsQueryValue
  const isValidPriceQuery =
    checkPriceFromQuery(+priceFromQueryValue) &&
    checkPriceFromQuery(+priceToQueryValue)

  return {
    isValidBoilerQuery,
    isValidPartsQuery,
    isValidPriceQuery,
    priceFromQueryValue,
    priceToQueryValue,
    boilerQueryValue,
    partsQueryValue,
  }
}

// export const updateParamsAndFiltersFromQuery = async (
//   callback: VoidFunction,
//   path: string
// ) => {
//   callback()

//   const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`)

//   setFilteredBoilerParts(data)
// }
export const updateParamsAndFiltersFromQuery = async (
  callback: VoidFunction,
  path: string,
  refetch: VoidFunction,
  setParams: Dispatch<SetStateAction<string>>
) => {
  callback()

  await setParams(`/boiler-parts?limit=20&offset=${path}`)
  await refetch()
  // setFilteredBoilerParts(data)
}


// используется в priceRange
export async function updateParamsAndFilters<T>(
  updatedParams: any,
  path: string,
  searchParams: searchParams,
  pathname: string,
  refetch: any,
  setQueryParams: Dispatch<SetStateAction<string>>,
  router: AppRouterInstance,
) {

  const params = new URLSearchParams(searchParams.toString())
  for (const [key, value] of Object.entries(updatedParams) as [
    string,
    any
  ][]) {
    params.set(key, value.toString());
  }

  setQueryParams(params.toString())
  router.push(`${pathname}?${params.toString()}`)

  refetch()

  // setFilteredBoilerParts(data)
}
