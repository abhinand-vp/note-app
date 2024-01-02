import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import Category from "../components/Category";
import DetailViewPage from "../components/DetailViewPage";
import FolderListing from "../components/FolderListing";
import {
    addNotes,
    archiveItemAction,
    favButtonClickAction,
    favDelete,
    getNotes,
    getTrash,
    moveToTrash,
    searchAction,
    updateNotes
} from "../store/allNotes/NotesActions";
import { addFolder, getFolder } from "../store/allFolder/FolderAction";
import { getArchived } from "../store/allArchive/ArchiveActions";
import { SelectNoteReducer } from "../store/localStore/SelectedNotes";
import { inputTitle } from "../store/localStore/InputTitle";
import { inputContent } from "../store/localStore/InputContent";
import { allFolderReducer } from "../store/localStore/AllFolders";
import { ClickReducer } from "../store/localStore/SelectClick";


const HomePage = () => {
    const dispatch = useDispatch();
    
    //get Data from store
    const allNotes = useSelector((store) => store.note.notes);
    const allFolder = useSelector((store) => store.folder.folder);
    const allTrash = useSelector((store) => store.note.notes);
    const allArchived = useSelector((store) => store.archive.archived);
    const contentText = useSelector((store) => store.content.value);
    const TitleText = useSelector((store) => store.title.value);

    //states
    const [id, setid] = useState();
    const [folders, setfolders] = useState()
    const [folderNotes, setFolderNotes] = useState({})
    const [editToggle, setEditToggle] = useState(null);
    const [isFav, setisFav] = useState("list");
    const [folderSelect, setfolderSelect] = useState("")
    const [newFolders, setnewFolders] = useState("")
    const [search, setSearch] = useState("");

    console.warn({search});

    //give some predefined folders
    const allfolders = [];

    useEffect(() => {
        dispatch(getNotes());
        dispatch(getFolder());
        dispatch(allFolderReducer(allfolders))
    }, []);


    function validateForm() {
        if (TitleText.length > 0 && contentText.length > 0) {
            saveNotes();
        }
        else {
            alert('Invalid Form fill the Title , Desc & select Option')
        }
    }

    useEffect(() => {
        dispatch(allFolderReducer(allFolder))
    }, [allFolder])

    useEffect(()=>{
        dispatch(searchAction(search))
    },[search])


    const addNewFolders = () => {
        let params = {
            name: newFolders
        }
        if (newFolders.length > 0) {
            dispatch(addFolder(params));
            setTimeout(() => {
                dispatch(getFolder());
            }, 300)
        }
        else {
            alert('Enter Valid Folder Name')
        }
    }

    useEffect(() => {
        if (folderSelect) {
            const folderSelectData = allNotes.filter((data) => {
                return data.folderName == folderSelect
            })
            setFolderNotes(folderSelectData);
            setisFav("folderSelect");
        }
    }, [folderSelect])


    const editHandler = (selected) => {
        setEditToggle(selected?.id);
        dispatch(inputTitle(selected.title))
        dispatch(inputContent(selected.content))
        setfolders(selected?.folderId);
        setid(selected?.id);
    }

    const saveNotes = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        if (editToggle) {
            let params = {
                title: TitleText,
                content: contentText,
                createdDate: formattedDate,
                folderId: folders,
                id: id
            }
            dispatch(updateNotes(params))
        }
        else {
            let params = {
                title: TitleText,
                content: contentText,
                createdDate: formattedDate,
                folder: {
                    id: folders
                }
            }
            dispatch(addNotes(params));
        }
    }


    const deleteNote = (selected) => {
        let params = {
            id: selected.id
        }
        dispatch(moveToTrash(params)).then((res => {
            dispatch(getNotes());
            dispatch(SelectNoteReducer())
        }))
    }

    const favItems = (selected) => {
        dispatch(favDelete(selected))
        dispatch(SelectNoteReducer());
        setTimeout(() => {
            dispatch(getNotes())
        }, 200)
    }

    const favBtnClick = () => {
        dispatch(favButtonClickAction())
        dispatch(getNotes());
        setisFav("fav")
    }

    const TrashButtonClick = () => {
        dispatch(getTrash());
        setisFav("trash");
    }

    const ArchiveButtonClick = () => {
        dispatch(getArchived());
        setisFav("archive");
    }

    const ArchivedItesm = (id) => {
        dispatch(archiveItemAction(id)).then((res => {
            dispatch(getNotes());
        }))
    }


    return (
        <div className="flex h-[100vh]">
            <div className="flex-initial w-3/12">
                <Category
                    favBtnClick={favBtnClick}
                    folderSelect={folderSelect}
                    setfolderSelect={setfolderSelect}
                    setnewFolders={setnewFolders}
                    newFolders={newFolders}
                    addNewFolders={addNewFolders}
                    setSearch={setSearch}
                    search={search}
                    TrashButtonClick={TrashButtonClick}
                    ArchiveButtonClick={ArchiveButtonClick}
                />
            </div>
            <div className="flex-initial w-3/12 overflow-y-auto h-[100vh] bg-[#1C1C1C]">
                <FolderListing
                    isFav={isFav}
                    folderNotes={folderNotes}
                    allTrash={allTrash}
                    allArchived={allArchived}
                />
            </div>
            <div className="flex-initial w-6/12">
                <DetailViewPage
                    setfolders={setfolders}
                    editHandler={editHandler}
                    editToggle={editToggle}
                    deleteNote={deleteNote}
                    favItems={favItems}
                    ArchivedItesm={ArchivedItesm}
                    validateForm={validateForm}
                    folders={folders}
                />
            </div>
        </div>
    )
}

export default HomePage 