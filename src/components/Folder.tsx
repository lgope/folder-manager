import { Icon } from "../Styles";
import DeleteFolder from "./DeleteFolder";

// types
import { useDispatch, useSelector } from "react-redux";
import { updateSubFolder } from "../redux/actions/folderAction";
import { selectFolders } from "../redux/reducers/folderReducer";

const Folder = ({ folder }: {folder: string}) => {
  const folderData = useSelector(selectFolders);
  const dispatch = useDispatch();

  const handleFolderClick = () => {
    const path = [...folderData.path, folder];
    let subFolder = folderData.data[path[0]];

    path.shift()
    path.forEach((pathName) => {
      subFolder = subFolder.child[pathName];
    });

    dispatch(updateSubFolder([...folderData.path, folder], subFolder.child));
  };

  return (
    <div className="folder">
      <div className="folder-caption" onClick={handleFolderClick}>
        <Icon className="fas fa-folder"></Icon>
        <span>{folder}</span>
      </div>

      <div className="delete-action" title="Delete Folder">
        <DeleteFolder folder={folder} />
      </div>
    </div>
  );
};

export default Folder;
