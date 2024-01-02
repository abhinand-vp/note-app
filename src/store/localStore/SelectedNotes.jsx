import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
}

export const selecetSlice = createSlice({
    name: 'selectNote',
    initialState,
    reducers: {
        SelectNoteReducer: (state, action) => {
            state.value = action.payload
        }
    },
})

export const { SelectNoteReducer } = selecetSlice.actions

export default selecetSlice.reducer