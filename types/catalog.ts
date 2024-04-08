import { Dispatch, SetStateAction } from 'react'

export interface IManufacturersBlockProps {
  title: string
  event: any
  manufacturersList: IFilterCheckboxItem[]
}

export interface IManufacturersBlockItemProps {
  item: IFilterCheckboxItem
  event: any
}
export interface IQueryParams {
  offset: string
  first: string | null
  boiler: string
  parts: string
  priceFrom: string
  priceTo: string
  partId: string
}

export interface IFilterCheckboxItem {
  title: string
  checked: boolean
  id?: string
  event?: any
}

export interface IFilterManufacturerAccordionProps {
  manufacturersList: IFilterCheckboxItem[];
  title: string | false;
  updateManufacturer: any;
  setManufacturer: any
}

interface ICatalogBaseTypes {
  priceRange: number[]
  setPriceRange: (arg0: number[]) => void
  setIsPriceRangeChanged: (arg0: boolean) => void
}

interface ICatalogFiltersBaseTypes {
  resetFilterBtnDisabled: boolean
  resetFilters: VoidFunction
}

export interface ICatalogFiltersProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  isPriceRangeChanged: boolean
  currentPage: number
  setIsFilterInQuery: (arg0: boolean) => void
  closePopup: VoidFunction
  filtersMobileOpen: boolean
  setQueryParams: Dispatch<SetStateAction<string>>
  refetch: any
}

export type IPriceRangeProps = ICatalogBaseTypes

export interface ICatalogFilterDesktopProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  spinner: boolean
  applyFilters: VoidFunction
}

export interface ICatalogFilterMobileProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  spinner: boolean
  applyFilters: VoidFunction
  closePopup: VoidFunction
  filtersMobileOpen: boolean
}

export interface IFiltersPopupTop {
  resetBtnText: string
  title: string
  resetFilters: VoidFunction
  resetFilterBtnDisabled: boolean
  closePopup: VoidFunction
}

export interface IFiltersPopupProps extends IFilterManufacturerAccordionProps {
  resetFilterBtnDisabled: boolean
  resetAllManufacturers: VoidFunction
  handleClosePopup: VoidFunction
  applyFilters: VoidFunction
  openPopup: boolean
}
