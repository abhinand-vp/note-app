import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: "",
}

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        inputContent: (state, action) => {
            state.value = action.payload
        }
    },
})

export const { inputContent } = contentSlice.actions

export default contentSlice.reducer