import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    change(_, action) {
      return action.payload;
    },
  },
});

export const { change } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
