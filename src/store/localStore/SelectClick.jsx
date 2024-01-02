import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: "",
}

export const clickSlice = createSlice({
    name: 'clickList',
    initialState,
    reducers: {
        ClickReducer: (state, action) => {
            state.value = action.payload
        }
    },
})

export const { ClickReducer } = clickSlice.actions

export default clickSlice.reducer