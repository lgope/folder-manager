import "./File.css";

import { ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";

import { blue } from "@mui/material/colors";

import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { getHumanFileSize } from "../../utils/data";
import { updateSubFolder } from "../../redux/actions/folderAction";
import { useDispatch } from "react-redux";


import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FileActions from "./FileActions";


const File = (props) => {
  const { file, handleDoubleClick, handleContextMenu } = props;

  const dispatch = useDispatch();

  const handleClick = () => {
    console.log(file);
    dispatch(updateSubFolder(file));
  };

  return (
    <div
      className="File"
      // onClick={handleClick}
      onDoubleClick={handleClick}
      // onContextMenu={handleContextMenu}
      // data-selected={isSelected}
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
