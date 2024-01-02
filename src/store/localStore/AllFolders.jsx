import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
}

export const allFolderSlice = createSlice({
    name: 'allFolders',
    initialState,
    reducers: {
        allFolderReducer: (state, action) => {
            state.value = action.payload
        }
    },
})

export const { allFolderReducer } = allFolderSlice.actions

export default allFolderSlice.reducer