import "./File.css";

import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";

import { updateSubFolder } from "../../redux/actions/folderAction";
import { useDispatch } from "react-redux";

import FileActions from "./FileActions";

import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

// import FileImageIcon from "../../assets/images/file.png";
// import FolderImageIcon from "../../assets/images/folder.png";

const File = ({ file, index }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (file.isFolder) {
      dispatch(updateSubFolder({ ...file, index }));
    }
  };

  return (
    <div
      style={{ position: "static" }} // Setting position according to the modal state
      className={`folder-panel files-panel__item folder ${
        file.isFolder ? "folder" : "file"
      } `}
      onDoubleClick={handleClick}
    >
      <div className="folder-icon">
        {file.isFolder ? (
          <FolderIcon style={{ color: file.color }} />
        ) : (
          <InsertDriveFileIcon style={{ color: file.color }} />
        )}

        <p className="files-panel__item-title">{file.name}</p>
      </div>
    </div>
  );
};

export default File;
