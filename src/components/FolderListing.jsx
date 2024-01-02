import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { openAddForm } from "../store/localStore/openAddForm";
import { deleteTrash, getTrash, removeFromTrash } from "../store/allNotes/NotesActions";
import { getArchived, restoreArchive } from "../store/allArchive/ArchiveActions";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { SelectNoteReducer } from "../store/localStore/SelectedNotes";
import { ClickReducer } from "../store/localStore/SelectClick";


// eslint-disable-next-line react/prop-types
const FolderListing = ({ isFav, folderNotes, allTrash, allArchived }) => {

    const dispatch = useDispatch();

    // const [isClicked, setIsClicked] = useState("");
    const allNotes = useSelector((store) => store.note.notes);
    console.warn({allNotes});
    const favItems = allNotes.filter((item) => item.favorite == true);
    const dispalyNotes = allNotes.filter((item) => item.trash == false);

    const isClicked = useSelector((store) => store.isClicked.value);

    console.warn({isClicked});

    const handleFolderClick = (event, note) => {
        dispatch(SelectNoteReducer(note))
        dispatch(openAddForm(false));
        dispatch(ClickReducer(note.id))
    }

    function refreshTrash() {
        setTimeout(() => {
            dispatch(getTrash());
            dispatch(SelectNoteReducer())
        }, 100)
    }

    const handleRestore = (id) => {
        dispatch(removeFromTrash(id))
        refreshTrash();
    }

    const handleDelete = (id) => {
        dispatch(deleteTrash(id))
        refreshTrash();
    }

    const handleArchiveRestore = (id) => {
        dispatch(restoreArchive(id));
        setTimeout(() => {
            dispatch(getArchived());
            dispatch(SelectNoteReducer())
        }, 100)
    }

    return (
        <div className="bg-[#1C1C1C] p-3 h-full">

            {isFav == "list" &&
                <>
                    <p className='text-[#fdfdfd] text-lg font-semibold my-8 mx-2'>All Notes</p>
                    {dispalyNotes && dispalyNotes.length > 0 && dispalyNotes.map((note, index) => (
                        <>
                        <div className={`mt-5 bg-[#232323] w-full h-24 p-3 rounded cursor-pointer  ${note?.id == isClicked ? 'bg-[#444444] text-white' : "bg-[#232323]"}`}>
                            <div key={index} onClick={(event) => handleFolderClick(event, note)} >
                                <h1 className="text-white text-lg font-semibold">{note?.title.substring(0, 25)}</h1>
                                <div className="flex mt-3 space-x-5">
                                    <h1 className="text-white text-sm w-20">{note?.createdDate}</h1>
                                    <h1 className="text-white font-thin text-sm break-words">{note?.content.substring(0, 25)}</h1>
                                </div>
                            </div>
                        </div>
                        </>
                    ))}
                </>}

            {isFav == "trash" &&
                <>
                    <p className='text-[#fdfdfd] text-lg font-semibold my-8 mx-2'>All Trash</p>
                    {allTrash && allTrash.length > 0 && allTrash.map((note, index) => (
                        <>
                            <div key={index} onClick={(event) => handleFolderClick(event, note)} className={`mt-5 bg-[#232323] w-full h-24 p-3 rounded cursor-pointer ${note?.id == isClicked ? 'bg-[#444444] text-white' : "bg-[#232323]"}`}>
                                <div className="flex justify-between">
                                    <h1 className="text-white text-lg font-semibold">{note?.title.substring(0, 25)}</h1>
                                    <div className="space-x-3">
                                        <button className="bg-blue-500 p-1 rounded" onClick={() => handleRestore(note?.id)}><MdOutlineSettingsBackupRestore className="text-white" /></button>
                                        <button className="bg-blue-500 p-1 rounded" onClick={() => handleDelete(note?.id)}><AiOutlineDelete className="text-white" /></button>
                                    </div>
                                </div>
                                <div className="flex mt-3 space-x-5">
                                    <h1 className="text-white text-sm w-20">{note?.createdDate.substring(0, 25)}</h1>
                                    <h1 className="text-white font-thin text-sm break-words">{note?.content.substring(0, 25).substring(0, 25)}</h1>
                                </div>
                            </div>
                        </>
                    ))}
                </>}

            {isFav == "archive" &&
                <>
                    <p className='text-[#fdfdfd] text-lg font-semibold my-8 mx-2'>All Archived</p>
                    {allArchived && allArchived.length > 0 && allArchived.map((note, index) => (
                        <>
                            <div key={index} onClick={(event) => handleFolderClick(event, note)} className={`mt-5 bg-[#232323] w-full h-24 p-3 rounded cursor-pointer ${note?.id == isClicked ? 'bg-[#444444] text-white' : "bg-[#232323]"}`}>
                                <div className="flex justify-between">
                                    <h1 className="text-white text-lg font-semibold">{note?.title.substring(0, 25)}</h1>
                                    <div className="space-x-3">
                                        <button className="bg-blue-500 p-1 rounded" onClick={() => handleArchiveRestore(note?.id)}><MdOutlineSettingsBackupRestore className="text-white" /></button>
                                    </div>
                                </div>
                                <div className="flex mt-3 space-x-5">
                                    <h1 className="text-white text-sm w-20">{note?.createdDate.substring(0, 25)}</h1>
                                    <h1 className="text-white font-thin text-sm break-words">{note?.content.substring(0, 25).substring(0, 25)}</h1>
                                </div>
                            </div>
                        </>
                    ))}
                </>}


            {isFav == "fav" &&
                <>
                    <p className='text-[#fdfdfd] text-lg font-semibold my-8 mx-2'>Favorites</p>
                    {favItems && favItems.length > 0 && favItems.map((note, index) => (
                        <>
                            <div key={index} onClick={(event) => handleFolderClick(event, note)} className={`mt-5 bg-[#232323] w-full h-24 p-3 rounded cursor-pointer ${note?.id == isClicked ? 'bg-[#444444] text-white' : "bg-[#232323]"}`}>
                                <h1 className="text-white text-lg font-semibold">{note?.title.substring(0, 25)}</h1>
                                <div className="flex mt-3 space-x-5">
                                    <h1 className="text-white text-sm w-20">{note?.createdDate}</h1>
                                    <h1 className="text-white font-thin text-sm break-words">{note?.content.substring(0, 25)}</h1>
                                </div>
                            </div>
                        </>
                    ))}
                </>}

            {isFav == "folderSelect" &&
                <>
                    <p className='text-white text-lg font-semibold my-8 mx-2 capitalize'>{folderNotes && folderNotes.length > 0 && folderNotes[0].folderName}</p>
                    {folderNotes && folderNotes.length == 0 ?
                        <>
                            <p className="text-center text-white text-2xl font-semibold">No Items In this Folder</p>
                        </>
                        : <>
                            {folderNotes.map((note, index) => (
                                <>
                                    <div key={index} onClick={(event) => handleFolderClick(event, note)} className={`mt-5 bg-[#232323] w-full h-24 p-3 rounded cursor-pointer ${note?.id == isClicked ? 'bg-[#444444] text-white' : "bg-[#232323]"}`}>
                                        <h1 className="text-white text-lg font-semibold">{note?.title.substring(0, 25)}</h1>
                                        <div className="flex mt-3 space-x-5">
                                            <h1 className="text-white text-sm w-20">{note?.createdDate}</h1>
                                            <h1 className="text-white font-thin text-sm break-words">{note?.content.substring(0, 25)}</h1>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </>
                    }
                </>
            }
        </div>

    )
}

export default FolderListing