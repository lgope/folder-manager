import "./File.css";

import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";

import { updateSubFolder } from "../../redux/actions/folderAction";
import { useDispatch } from "react-redux";

import FileActions from "./FileActions";

import FileImageIcon from "../../assets/images/file.png";
import FolderImageIcon from "../../assets/images/folder.png";

const File = ({file}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(updateSubFolder(file));
  };

  return (
    <div
      className={`File ${!file.isFolder ? 'file-node' : ""}`}
      onDoubleClick={handleClick}
    >
      <ListItem>
        <ListItemAvatar>
          {/* <Avatar> */}
            {/* {file.isFolder ? <FolderIcon /> : <InsertDriveFileIcon />} */}
            {<img src={file.isFolder ? FolderImageIcon : FileImageIcon} alt={file.name} />}
          {/* </Avatar> */}
        </ListItemAvatar>
        <ListItemText className="filename" primary={file.name} />

        <FileActions file={file} />
      </ListItem>
    </div>
  );
};

export default File;
