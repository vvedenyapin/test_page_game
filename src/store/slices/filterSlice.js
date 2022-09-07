import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        provider: '',
        currency: ''
    },
    reducers: {
        setProviderFilter: (state, action) => {
            state.provider = action.payload;
        },
        setCurrencyFilter: (state, action) => {
            state.currency = action.payload;
        },
        resetFiltes: (state) => {
            state.currency = null;
            state.provider = null;
        }
    }
})

export const { setProviderFilter, setCurrencyFilter, resetFiltes } = filterSlice.actions

export default filterSlice.reducer