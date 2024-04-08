/* eslint-disable indent */
'use client'
// import { useStore } from 'effector-react'
// import { $mode } from '@/context/mode'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import {
  controlStyles,
  menuStyles,
  selectStyles,
} from '@/styles/catalog/select'
import { optionStyles } from '@/styles/searchInput'
import { IOption, SelectOptionType } from '@/types/common'
import { createSelectOption } from '@/utils/common'
import { categoriesOptions } from '@/utils/selectContents'
// import {
//   $boilerParts,
//   setBoilerPartsByPopularity,
//   setBoilerPartsCheapFirst,
//   setBoilerPartsExpensiveFirst,
// } from '@/context/boilerParts'


import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { IQueryParams } from '@/types/catalog'
import { setBoilerPartsByPopularity, setBoilerPartsCheapFirst, setBoilerPartsExpensiveFirst } from '@/lib/features/boilerParts/boilerPartsSlice'
import { useGetBoilerPartsFxQuery } from '@/lib/features/api/boilerParts'
import { Suspense } from "react";


const FilterSelect = ({
  setSpinner,
  refetch,
  setQueryParams
}: {
  setSpinner: boolean, //(arg0: boolean) => void
  refetch: () => void,
  setQueryParams: (arg0: string) => void
}) => {
  // const mode = useStore($mode)
  const currentThemeMode = useAppSelector(state => state.themeMode.mode);
  // const boilerParts = useStore($boilerParts)
  const boilerParts = useAppSelector(state => state.boilerParts.boilerParts);

  const dispatch = useAppDispatch();
  
  
  
  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)
  // роутинг
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const queryParamFirst = searchParams.get('first') ;

  
  const updateCategoryOption = (value: string) =>
    setCategoryOption({ value, label: value })



    const updateRoteParam = (first: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('first', first)
      params.set('offset', '0')
      params.set('limit', '20')
      router.push(pathname + '?' + params.toString())
      setQueryParams(params.toString())

    }

  const handleSortOptionChange = async (selectedOption: SelectOptionType) => {
    // setSpinner(true)
    setCategoryOption(selectedOption)

    switch ((selectedOption as IOption).value) {
      case 'Сначала дешевые':
        // setBoilerPartsCheapFirst()
        await updateRoteParam('cheap')
        await refetch()
        break
      case 'Сначала дорогие':
        // setBoilerPartsExpensiveFirst()
        await updateRoteParam('expensive')
        await refetch()
        break
      case 'По популярности':
        // setBoilerPartsByPopularity()
        await updateRoteParam('popular')
        await refetch()
        break
    }

    // setTimeout(() => setSpinner(false), 1000)
  }

  return (
    <Suspense>
      <Select
        placeholder="Я ищу..."
        value={categoryOption || createSelectOption("По популярности")}
        onChange={handleSortOptionChange}
        styles={{
          ...selectStyles,
          control: (defaultStyles) => ({
            ...controlStyles(defaultStyles, currentThemeMode),
          }),
          input: (defaultStyles) => ({
            ...defaultStyles,
            color: currentThemeMode === "dark" ? "#f2f2f2" : "#222222",
          }),
          menu: (defaultStyles) => ({
            ...menuStyles(defaultStyles, currentThemeMode),
          }),
          option: (defaultStyles, state) => ({
            ...optionStyles(defaultStyles, state, currentThemeMode),
          }),
        }}
        isSearchable={false}
        options={categoriesOptions}
      />
    </Suspense>
  );
}

export default FilterSelect
