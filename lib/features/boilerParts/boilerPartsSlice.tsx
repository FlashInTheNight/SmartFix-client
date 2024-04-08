import { IBoilerParts } from '@/types/boilerparts';
import { IFilterCheckboxItem } from '@/types/catalog';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { boilerManufacturers, partsManufacturers } from '@/utils/catalog';

interface IBoilerPartsState {
  boilerParts: IBoilerParts;
  boilerManufacturers: IFilterCheckboxItem[];
  partsManufacturers: IFilterCheckboxItem[];
  filteredBoilerParts: IBoilerParts;
}

const initialState: IBoilerPartsState = {
  boilerParts: {} as IBoilerParts,
  boilerManufacturers: boilerManufacturers,
  partsManufacturers: partsManufacturers,
  filteredBoilerParts: {} as IBoilerParts,
};

const boilerPartsSlice = createSlice({
  name: 'boilerParts',
  initialState,
  reducers: {
    setBoilerParts(state, action: PayloadAction<IBoilerParts>) {
      state.boilerParts = action.payload || {};
    },
    setBoilerPartsCheapFirst(state) {
      state.boilerParts.rows = state.boilerParts.rows.sort((a, b) => a.price - b.price);
    },
    setBoilerPartsExpensiveFirst(state) {
      state.boilerParts.rows.sort((a, b) => b.price - a.price);
    },
    setBoilerPartsByPopularity(state) {
      state.boilerParts.rows.sort((a, b) => b.popularity - a.popularity);
    },
    setFilteredBoilerParts(state, action: PayloadAction<IBoilerParts>) {
      state.filteredBoilerParts = action.payload;
    },
    setBoilerManufacturers(state, action: PayloadAction<IFilterCheckboxItem[]>) {
      state.boilerManufacturers = action.payload;
    },
    updateBoilerManufacturer(state, action: PayloadAction<IFilterCheckboxItem>) {
      state.boilerManufacturers = state.boilerManufacturers.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    },
    setPartsManufacturers(state, action: PayloadAction<IFilterCheckboxItem[]>) {
      state.partsManufacturers = action.payload;
    },
    updatePartsManufacturer(state, action: PayloadAction<IFilterCheckboxItem>) {
      state.partsManufacturers = state.partsManufacturers.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    },
  },
});

export const {
  setBoilerParts,
  setBoilerPartsCheapFirst,
  setBoilerPartsExpensiveFirst,
  setBoilerPartsByPopularity,
  setFilteredBoilerParts,
  setBoilerManufacturers,
  updateBoilerManufacturer,
  setPartsManufacturers,
  updatePartsManufacturer,
} = boilerPartsSlice.actions;

export default boilerPartsSlice.reducer;

/*
Обратите внимание, что я не включил функции 
setBoilerManufacturersFromQuery и 
setPartsManufacturersFromQuery, поскольку они требуют дополнительного контекста для переписывания. Вы можете добавить их в reducers и реализовать соответствующим образом. Этот код создает экшены и редьюсеры, которые вы можете использовать в своем приложении Redux. Пожалуйста, убедитесь, что вы импортировали и использовали этот редьюсер в вашем хранилище Redux.
*/