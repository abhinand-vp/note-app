import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FaPen } from 'react-icons/fa';
import { CgNotes } from 'react-icons/cg';
import { GoSearch } from "react-icons/go";
import { AiFillDelete, AiFillFolder, AiFillFolderOpen, AiOutlineFolderAdd, AiOutlineStar } from 'react-icons/ai';
import { BiTrashAlt } from 'react-icons/bi';
import { openAddForm } from '../store/localStore/openAddForm';
import { SelectNoteReducer } from '../store/localStore/SelectedNotes';
import { ClickReducer } from '../store/localStore/SelectClick';

// eslint-disable-next-line react/prop-types
const Category = ({ favBtnClick, setfolderSelect, setnewFolders, newFolders, addNewFolders, setSearch, search, TrashButtonClick, ArchiveButtonClick }) => {
    const dispatch = useDispatch();

    const allNotes = useSelector((store) => store.note.notes);
    const allFolderLists = useSelector((store) => store.allFolders.value);

    // const [isClicked, setIsClicked] = useState("");
    const [inputbox, setinputbox] = useState(false);
    const [folderOpen, setfolderOpen] = useState(false);
    const [serachBox, setserachBox] = useState(false);
    const isClicked = useSelector((store) => store.isClicked.value);


    // eslint-disable-next-line react/prop-types
    const recentNotes = allNotes && allNotes.length > 0 && allNotes.slice(-3);

    const handleFolderClick = (item) => {
        setfolderSelect(item?.name)
        setfolderOpen(item?.id)
    }

    const handleclick = (event, note) => {
        dispatch(SelectNoteReducer(note))
        dispatch(ClickReducer(note?.id))
    }

    const createNewFolder = () => {
        setinputbox(!inputbox);
    }

    const handleclickFolderOpen = () => {
        addNewFolders();
        setinputbox(!inputbox);
    }

    const addNewNotes = () => {
        dispatch(openAddForm(true))
        dispatch(SelectNoteReducer())
    }

    const Debounce = (cb, timeDelay) => {
        let timer;
        return function (...args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                cb(...args)
            }, timeDelay)
        }
    }

    const hanldeSearchChange = Debounce((e) => {
        setSearch(e.target.value)
    }, 700)

    return (
        <div className="p-3 bg-[#181818] h-[100vh] overflow-y-auto">
            <div className="flex justify-between px-1 my-7">
                <div className='relative'><h2 className="nowted-title cursor-pointer" onClick={()=>window.location.reload()}>nowted</h2>
                    <p className='text-[#747474] absolute left-[90px] font-["Kaushan"] top-0'><FaPen /></p>
                </div>
                <div><GoSearch onClick={() => setserachBox(!serachBox)} className='text-[#747474] text-2xl mr-3 mt-2 cursor-pointer' /></div>
            </div>
            {serachBox && <>
                <div className='flex mb-4'>
                    <input
                        // value={search}
                        maxLength={25}
                        placeholder="Search Here"
                        onChange={hanldeSearchChange}
                        className='p-2 rounded-md m-2 w-11/12 h-10 bg-black  text-[#747474] placeholder-white'
                    />
                    {/* <button onClick={handleSearch} className='bg-blue-500 p-2 rounded w-12 h-10 mt-2 ml-3'><GoSearch className='text-2xl ml-1 text-white' /></button> */}
                </div>
            </>}

            <div className='flex justify-center'>
                <button onClick={addNewNotes} className='bg-[#242424] w-[90%] h-14 text-xl font-normal text-white'><span> + </span> Add Notes</button>
            </div>

            <div className='my-6 mx-2' >
                <p className='text-[#9d9d9d] text-lg font-semibold mb-2'>Recents</p>
                <div>
                    {recentNotes && recentNotes.length > 0 && recentNotes.map((note) => (
                        <>
                            <div key={note?.id} onClick={(event) => handleclick(event, note)} className={`flex justify-start p-2 space-x-4 text-[#9d9d9d] cursor-pointer ${note?.id === isClicked ? 'bg-blue-500 text-white' : ""}`} >
                                <CgNotes className={`text-[#747474] text-2xl ${note?.id == isClicked ? 'text-white' : ""}`} />
                                <p className='text-white'>{note?.title.substring(0, 25)}</p>
                            </div>
                        </>
                    ))}
                </div>
            </div>

            <div className='my-6 mx-2'>
                <div className='flex justify-between'>
                    <p className='text-[#9d9d9d] text-lg font-semibold'>Folder</p>
                    <AiOutlineFolderAdd onClick={createNewFolder} className='text-[#747474] cursor-pointer text-2xl mr-3' />
                </div>
                {inputbox && <>
                    <div className='flex'>
                        <AiFillFolderOpen className='text-[#747474] text-2xl mt-4 mr-2' />
                        <input
                            value={newFolders}
                            maxLength={25}
                            placeholder="Title for the Folder"
                            onChange={(e) => setnewFolders(e.target.value)}
                            className='p-3 rounded-md m-2 w-60 h-10 bg-transparent  text-[#747474] placeholder-white'
                        />
                        <button onClick={handleclickFolderOpen} className='bg-blue-500 p-2 rounded w-16 h-10 mt-2 ml-4'>Add</button>
                    </div>

                </>}
                {allFolderLists && allFolderLists.length > 0 && allFolderLists.map((item, index) => (
                    <>
                        <div className={`flex justify-start space-x-4 text-[#9d9d9d] p-2 cursor-pointer ${folderOpen == item?.id ? 'bg-[#242424] text-white rounded' : ''}`} key={index} onClick={() => handleFolderClick(item)} >
                            {folderOpen == item?.id ? <>
                                <AiFillFolderOpen className='mt-1 text-xl' />
                            </> :
                                <>
                                    <AiFillFolder className='mt-1 text-xl' />
                                </>}

                            <p>{item?.name}</p>
                        </div>
                    </>
                ))}
            </div>

            <div className='my-6 mx-2'>
                <p className='text-[#9d9d9d] text-lg font-semibold mb-3'>More</p>
                <div className='space-y-3'>
                    <div className='flex justify-start space-x-4 text-[#9d9d9d] border-red-300 cursor-pointer' onClick={favBtnClick}>
                        <AiOutlineStar className='text-xl' />
                        <p>Favorites</p>
                    </div>
                    <div className='flex justify-start space-x-4 text-[#9d9d9d] cursor-pointer' onClick={TrashButtonClick}>
                        <BiTrashAlt className='text-xl' />
                        <p>Trash</p>
                    </div>
                    <div className='flex justify-start space-x-4 text-[#9d9d9d] cursor-pointer' onClick={ArchiveButtonClick}>
                        <AiFillDelete className='text-xl' />
                        <p>Archived Notes</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category