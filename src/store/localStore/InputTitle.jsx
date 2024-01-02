import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: "",
}

export const titleSlice = createSlice({
    name: 'title',
    initialState,
    reducers: {
        inputTitle: (state, action) => {
            state.value = action.payload
        }
    },
})

export const { inputTitle } = titleSlice.actions

export default titleSlice.reducer