import React, { useState } from "react";

import { Menu, MenuItem, Typography } from "@mui/material";

import { useDispatch } from "react-redux";

import {
  deleteFolder,
  updateFileOnDuplicate,
  updateFolderColorOnChange,
} from "../../redux/actions/folderAction";
import { debounce } from "../../utils/data";

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";

import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";

import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";

import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import FolderDeleteOutlinedIcon from "@mui/icons-material/FolderDeleteOutlined";

import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";

import Swal from "sweetalert2";
import { FileType } from "../../types/interfaces";
import FolderInfoModal from "../FolderInfo/FolderInfoModal";

const FileActions = ({
  file,
  contextMenu,
  handleClose,
  handleOpenFolder,
  handleOnRenameFolder,
  handleOnCopyFolder,
  handleOnCutFolder,
}: {
  file: FileType;
  contextMenu: any;
  handleClose: () => void;
  handleOpenFolder: () => void;
  handleOnRenameFolder: () => void;
  handleOnCopyFolder: () => void;
  handleOnCutFolder: () => void;
}) => {
  const [color, setColor] = useState(file.color);

  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFolder(file.id));
      }
    });
    handleClose();
  };

  const handleOnColorChange = debounce((e, value) => {
    e.stopPropagation();
    setColor(value);
    dispatch(updateFolderColorOnChange(file.id, value));
  }, 200);

  const handleDuplicate = () => {
    dispatch(updateFileOnDuplicate(file));
  };

  return (
    <>
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
        className="file-context-menu"
      >
        <Paper sx={{ width: 320, maxWidth: "100%" }}>
          <MenuList>
            <MenuItem onClick={handleOpenFolder} disabled={!file.isFolder}>
              <ListItemIcon>
                <FolderOpenOutlinedIcon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">Open</Typography>
              </ListItemText>
            </MenuItem>

            <Divider style={{ margin: "2px 8px 2px 8px" }} />

            <MenuItem onClick={handleOnCutFolder}>
              <ListItemIcon>
                <ContentCut fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">Cut</Typography>
              </ListItemText>
              <Typography fontSize="small">⌘X</Typography>
            </MenuItem>

            <MenuItem onClick={handleOnCopyFolder} style={{ cursor: "copy" }}>
              <ListItemIcon>
                <ContentCopy fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">Copy</Typography>
              </ListItemText>
              <Typography fontSize="small">⌘C</Typography>
            </MenuItem>

            <MenuItem onClick={handleDuplicate} style={{ cursor: "copy" }}>
              <ListItemIcon>
                {file.isFolder ? (
                  <FolderCopyOutlinedIcon fontSize="inherit" />
                ) : (
                  <FileCopyOutlinedIcon fontSize="inherit" />
                )}
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">Duplicate</Typography>
              </ListItemText>
              <Typography fontSize="small">⌘D</Typography>
            </MenuItem>

            <Divider style={{ margin: "2px 8px 2px 8px" }} />

            {/* <MenuItem onClick={handleClose} style={{ cursor: "help" }}>
              <ListItemIcon>
                <LightbulbOutlinedIcon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">Get Info</Typography>
              </ListItemText>
            </MenuItem> */}

            <FolderInfoModal onClose={handleClose} />

            <Divider style={{ margin: "2px 8px 2px 8px" }} />

            <MenuItem>
              <ListItemIcon>
                <ColorLensOutlinedIcon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">
                  Change Color
                  <input
                    type="color"
                    className="folder-color-picker"
                    value={color}
                    onChange={(e) => handleOnColorChange(e, e.target.value)}
                  />
                </Typography>
              </ListItemText>
            </MenuItem>

            <MenuItem onClick={handleOnRenameFolder}>
              <ListItemIcon>
                <DriveFileRenameOutlineOutlinedIcon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">Rename</Typography>
              </ListItemText>
            </MenuItem>

            <MenuItem onClick={handleDeleteClick}>
              <ListItemIcon>
                <FolderDeleteOutlinedIcon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">Delete</Typography>
              </ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Menu>
    </>
  );
};

export default FileActions;
