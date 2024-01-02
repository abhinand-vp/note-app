import { useDispatch, useSelector } from "react-redux";
import { inputContent } from "../store/localStore/InputContent";
import { inputTitle } from "../store/localStore/InputTitle";

// eslint-disable-next-line react/prop-types
const CreateNote = ({setfolders, action, onEditClick, validateForm, folders}) => {

    const dispatch = useDispatch();

    const contentText = useSelector((store) => store.content.value);
    const TitleText = useSelector((store) => store.title.value);
    const allFolderLists = useSelector((store) => store.allFolders.value);

    const handleDropdownChange = (e) => {
        setfolders(e.target.value);
    }

    const handleClick = () => {
        validateForm();
    }

    return (
        <div className='my-5 mr-8 h-[100vh] overflow-auto'>
            <form>
                <div className=''>
                    <input
                        type="text"
                        value={TitleText}
                        placeholder="Title for the Note"
                        onChange={(e)=> dispatch(inputTitle(e.target.value))}
                        className='p-3 rounded-md m-3 w-full h-10 bg-black border-white text-white placeholder-white'
                        required
                    />
                </div>
                <div>
                    <textarea
                        name="text"
                        value={contentText}
                        rows={15}
                        placeholder='Write here...'
                        className='px-3 py-2 rounded-md m-3 w-full bg-black border-white text-white placeholder-white'
                        onChange={(e)=> dispatch(inputContent(e.target.value))}
                        required
                    >
                    </textarea>
                </div>
                <div className="flex space-x-5 ml-5">
                    <select className="w-32 rounded" onChange={handleDropdownChange}>
                        <option value={folders}>Select Folder</option>
                        {Array.isArray(allFolderLists) && allFolderLists.map((item) => (
                            <>
                                <option key={item?.id} value={item?.id}>{item?.name}</option>
                            </>
                        ))}
                    </select>
                    <div className="ml-4">
                        <button className="bg-blue-500 border-white p-2 w-24 rounded font-semibold text-white mx-4" onClick={handleClick}>Save</button>                        
                        {action == "edit" && <>
                            <button className="bg-blue-500 border-white p-2 w-24 rounded font-semibold text-white" onClick={onEditClick}>cancel</button>
                        </>}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateNote