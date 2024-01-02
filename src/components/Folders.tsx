import { useDispatch, useSelector } from "react-redux";
import Folder from "./Folder";
import NewFolder from "./NewFolder";
import { selectFolders } from "../redux/reducers/folderReducer";
import { backWardFolder } from "../redux/actions/folderAction";

const FolderTree = ({ folders }: any) => {
  return (
    <div className="folder-container">
      {Object.keys(folders).length ? (
        Object.keys(folders).map((folder) => (
          <Folder key={folder} folder={folder} />
        ))
      ) : (
        <ul className="folder-data"> - No Folders</ul>
      )}

      {/* {folder.currentFolderAncestor._id && ( */}
      <div className="new-folder-action">
        <NewFolder />
      </div>
      {/* )} */}

      {/* <div className="new-folder-action">
        </div> */}
    </div>
  );
};

export default FolderTree;
