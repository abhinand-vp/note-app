import { configureStore } from '@reduxjs/toolkit';

import NotesSlice from './store/allNotes/NotesSlice';
import FolderSlice from './store/allFolder/FolderSlice';
import ArchiveSlice from './store/allArchive/ArchiveSlice';
import openAddForm from './store/localStore/openAddForm';
import SelectedNotes from './store/localStore/SelectedNotes';
import InputContent from './store/localStore/InputContent';
import InputTitle from './store/localStore/InputTitle';
import AllFolders from './store/localStore/AllFolders';
import SelectClick from './store/localStore/SelectClick';

export const store = configureStore({
  reducer: {
    note: NotesSlice,
    folder: FolderSlice,
    archive: ArchiveSlice,
    open: openAddForm,
    select: SelectedNotes,
    content: InputContent,
    title: InputTitle,
    allFolders : AllFolders,
    isClicked : SelectClick
  },
})