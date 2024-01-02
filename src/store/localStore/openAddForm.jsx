import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

export const localSlice = createSlice({
    name: 'openOrNot',
    initialState,
    reducers: {
        openAddForm: (state, action) => {
            if (action.payload == false) {
                state.value = action.payload
            }
            else {
                state.value = !state.value
            }
        }
    },
})

export const { openAddForm } = localSlice.actions

export default localSlice.reducer