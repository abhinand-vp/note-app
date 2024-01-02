import { createSlice } from "@reduxjs/toolkit";
import { addNotes, archiveItemAction, deleteTrash, favButtonClickAction, getNotes, getTrash, moveToTrash, removeFromTrash, searchAction, updateNotes } from "./NotesActions";

const NoteSlice = createSlice({
    name: "notes",
    initialState: {
        loading: false,
        notes: [],
    },
    reducers: {},
    extraReducers: builder => {
        ///get Notes
        builder.addCase(getNotes.pending, state => {
            state.notes = [];
            state.loading = true;
        });
        builder.addCase(getNotes.fulfilled, (state, actions) => {
            state.notes = actions.payload ;
        });
        builder.addCase(getNotes.rejected, (state, { payload }) => {
            state.loading = false;
        });

        ///addNotes
        builder.addCase(addNotes.pending, state => {
            state.notes = [];
            state.loading = true;
        });
        builder.addCase(addNotes.fulfilled, (state, actions) => {
            state.notes.push(actions.payload);
        });
        builder.addCase(addNotes.rejected, (state, { payload }) => {
            state.loading = false;
        });

        ///update Notes
        builder.addCase(updateNotes.pending, state => {
            state.notes = [];
            state.loading = true;
        });
        builder.addCase(updateNotes.fulfilled, (state, actions) => {
            state.notes = actions.payload;
        });
        builder.addCase(updateNotes.rejected, (state, { payload }) => {
            state.loading = false;
        });

        ///getTrash
        builder.addCase(getTrash.pending, state => {
            state.notes = [];
            state.loading = true;
        });
        builder.addCase(getTrash.fulfilled, (state, actions) => {
            state.notes = actions.payload;
        });
        builder.addCase(getTrash.rejected, (state, { payload }) => {
            state.loading = false;
        });

        ///Move To Trash
        builder.addCase(moveToTrash.pending, state => {
            state.notes = [];
            state.loading = true;
        });
        builder.addCase(moveToTrash.fulfilled, (state, actions) => {

            const {id} = actions.payload;

            if(id){
                state.notes = state.notes.filter((ele) => ele.id != id)
            }
        });
        builder.addCase(moveToTrash.rejected, (state, { payload }) => {
            state.loading = false;
        });


        //remove to trash
        builder.addCase(removeFromTrash.pending, state => {
            state.notes = [];
            state.loading = true;
        });
        builder.addCase(removeFromTrash.fulfilled, (state, actions) => {
           state.notes.push(actions.payload);
        });
        builder.addCase(removeFromTrash.rejected, (state, { payload }) => {
            state.loading = false;
        });

         //delete
        builder.addCase(deleteTrash.pending, state => {
            state.notes = [];
            state.loading = true;
        });
        builder.addCase(deleteTrash.fulfilled, (state, actions) => {
            const {id} = actions.payload;

            if(id){
                state.notes = state.notes.filter((ele) => ele.id != id)
            }
        });
        builder.addCase(deleteTrash.rejected, (state, { payload }) => {
            state.loading = false;
        });

        //fav
        builder.addCase(favButtonClickAction.pending, state => {
            state.notes = [];
            state.loading = true;
        });
        builder.addCase(favButtonClickAction.fulfilled, (state, actions) => {
            state.notes = actions.payload;
        });
        builder.addCase(favButtonClickAction.rejected, (state, { payload }) => {
            state.loading = false;
        });

        //archive
        builder.addCase(archiveItemAction.pending, state => {
            state.notes = [];
            state.loading = true;
        });
        builder.addCase(archiveItemAction.fulfilled, (state, actions) => {
            // state.notes = actions.payload;
            state.notes = state.notes.filter((item) => item.archive != actions.payload.archive)
        });
        builder.addCase(archiveItemAction.rejected, (state, { payload }) => {
            state.loading = false;
        });

        //search
        builder.addCase(searchAction.pending, state => {
            state.notes = [];
            state.loading = true;
        });
        builder.addCase(searchAction.fulfilled, (state, actions) => {
            state.notes = actions.payload;
        });
        builder.addCase(searchAction.rejected, (state, { payload }) => {
            state.loading = false;
        });
    }
    
});

export default NoteSlice.reducer;