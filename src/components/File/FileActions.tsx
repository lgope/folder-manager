import React, { useState } from "react";

import {
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import { useDispatch } from "react-redux";

import { updateFolderColorOnChange } from "../../redux/actions/folderAction";
import { debounce } from "../../utils/data";

const FileActions = ({ file, contextMenu, handleClose, handleOpenFolder }) => {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const dispatch = useDispatch();


  const handleDeleteClick = () => {
    setOpenConfirmationDialog(true);
    // setAnchorEl(null);
  };

  const handleOnColorChange = debounce((e, value) => {
    e.stopPropagation();
    // setColor(value);
    dispatch(updateFolderColorOnChange(file.id, value));
  }, 200);

  return (
    <Menu
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
      style={{ fontSize: "12px" }}
    >
      <MenuItem onClick={handleOpenFolder} disabled={!file.isFolder}>
        <Typography fontSize="small">Open</Typography>
      </MenuItem>

      <MenuItem onClick={handleClose}>
        <Typography fontSize="small">Rename</Typography>
      </MenuItem>

      <MenuItem onClick={handleClose}>
        <Typography fontSize="small">Change Color</Typography>
      </MenuItem>

      <MenuItem onClick={handleClose}>
        <Typography fontSize="small">Delete</Typography>
      </MenuItem>
    </Menu>
  );
};

export default FileActions;
