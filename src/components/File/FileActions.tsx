import React, { useState } from "react";


import IconButton from "@mui/material/IconButton";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

// import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteFolder from "../DeleteFolder";

// const options = ["Rename", "Delete"];

const ITEM_HEIGHT = 48;

const FileActions = ({ file }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setOpenConfirmationDialog(true);
    setAnchorEl(null)
  }

  return (
    <div className="folder-actions">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {/* <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DriveFileRenameOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Rename</ListItemText>
        </MenuItem> */}

        <MenuItem onClick={handleDeleteClick}>
            <ListItemIcon>
              <DeleteOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* <ConfirmationDialog openConfirmationDialog={openConfirmationDialog} setOpenConfirmationDialog={setOpenConfirmationDialog} />
       */}

       <DeleteFolder openConfirmationDialog={openConfirmationDialog} setOpenConfirmationDialog={setOpenConfirmationDialog} file={file} />
    </div>
  );
};

export default FileActions;
