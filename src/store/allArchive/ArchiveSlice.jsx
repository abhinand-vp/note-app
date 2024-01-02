import { createSlice } from "@reduxjs/toolkit";
import { getArchived, restoreArchive } from "./ArchiveActions";

const ArchiveSlice = createSlice({
    name: "archived",
    initialState: {
        loading: false,
        archived: [],
    },
    reducers: {},
    extraReducers: builder => {
        //get Archive
        builder.addCase(getArchived.pending, state => {
            state.archived = [];
            state.loading = true;
        });
        builder.addCase(getArchived.fulfilled, (state, actions) => {
            state.archived = actions.payload;
        });
        builder.addCase(getArchived.rejected, (state, { payload }) => {
            state.loading = false;
        });
        

        //restoreArchive
        builder.addCase(restoreArchive.pending, state => {
            state.archived = [];
            state.loading = true;
        });
        builder.addCase(restoreArchive.fulfilled, (state, actions) => {
            const {id} = actions.payload;

            if(id){
                state.archived = state.archived.filter((ele) => ele.id != id)
            }
        });
        builder.addCase(restoreArchive.rejected, (state, { payload }) => {
            state.loading = false;
        });
    }
});

export default ArchiveSlice.reducer;