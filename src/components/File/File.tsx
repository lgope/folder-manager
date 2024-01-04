import "./File.css";

import { ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";

import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { updateSubFolder } from "../../redux/actions/folderAction";
import { useDispatch } from "react-redux";

import FileActions from "./FileActions";


const File = ({file}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(updateSubFolder(file));
  };

  return (
    <div
      className="File"
      onDoubleClick={handleClick}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            {file.isFolder ? <FolderIcon /> : <InsertDriveFileIcon />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText className="filename" primary={file.name} />

        <FileActions file={file} />
      </ListItem>
    </div>
  );
};

export default File;
