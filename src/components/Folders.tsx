import { useDispatch, useSelector } from "react-redux";
import Folder from "./Folder";
import NewFolder from "./NewFolder";
import { selectFolders } from "../redux/reducers/folderReducer";
import { backWardFolder } from "../redux/actions/folderAction";

const FolderTree = ({ folders }: any) => {
  const folder = useSelector(selectFolders);
  const dispatch = useDispatch();

  const handleBackWard = () => {
    console.log(1, folder.currentFolderAncestor)
    dispatch(backWardFolder(folder.currentFolderAncestor))
  }

  return (
    <div className="folder-container">
      {folders.length ? (
        folders.map((folder) => <Folder key={folder._id} folder={folder} />)
      ) : (
        <ul className="folder-data"> - No Folders</ul>
      )}

      {folder.currentFolderAncestor._id && (
        <div className="new-folder-action">
          <NewFolder parentFolder={folder.currentFolderAncestor} />
         <button onClick={handleBackWard}>back</button>

        </div>
      )}

        {/* <div className="new-folder-action">
        </div> */}
    </div>
  );
};

export default FolderTree;
