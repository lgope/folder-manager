import React, { ReactElement, useState } from "react";

import { Paper, Menu, MenuItem, Typography, Divider } from "@mui/material";
import MenuList from "@mui/material/MenuList";

import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";

import ContentPaste from "@mui/icons-material/ContentPaste";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";

import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import AbcOutlinedIcon from "@mui/icons-material/AbcOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import {
  addFileToActiveStatus,
  addFolder,
  updateFileOnPaste,
  updateSubFolderOnSorting,
} from "../../redux/actions/folderAction";
import { selectFolders } from "../../redux/reducers/folderReducer";
import FolderInfoModal from "../FolderInfo/FolderInfoModal";

const ContextMenu = ({ children }: { children: ReactElement }) => {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const [contextSubMenu, setContextSubMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const folderData = useSelector(selectFolders);
  const { path, subFolder, stagedFile } = folderData;

  const dispatch = useDispatch();

  const setMenuRef = (
    event: React.MouseEvent,
    context: any,
    setFunc: (a: any) => void
  ) => {
    event.preventDefault();
    setFunc(
      context === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    setMenuRef(event, contextMenu, setContextMenu);
    removeActiveFolder();
  };

  const handleOnContextMenuClose = () => {
    setContextMenu(null);
  };

  const handleOnSubMenuClose = () => {
    setContextSubMenu(null);
  };

  const handleMenuMouseOver = (event: React.MouseEvent) => {
    setMenuRef(event, contextSubMenu, setContextSubMenu);
  };

  const handleOnSort = (sortBy: string) => {
    setContextSubMenu(null);
    dispatch(updateSubFolderOnSorting(sortBy));
  };

  const handleAddNewFile = (isFolder = true) => {
    const parentFolderId = path.length ? path[path.length - 1].id : "root";

    const newFolder = {
      id: uuidv4(),
      name: isFolder
        ? `untitled folder ${subFolder.length}`
        : `untitled${subFolder.length}.json`,
      isFolder: isFolder,
      color: isFolder ? "#45caf1" : "#cad444",
      parentId: parentFolderId,
      child: [],
    };

    dispatch(addFolder(newFolder));
    setContextMenu(null);
  };

  const removeActiveFolder = () => {
    const { activeFolder } = folderData;
    if (activeFolder.id) {
      dispatch(addFileToActiveStatus(""));
    }
  };

  const handleOnPaste = () => {
    let parentId = "root";
    if (path.length) {
      parentId = path[path.length - 1].id;
    }

    dispatch(updateFileOnPaste(parentId));
    setContextMenu(null);
  };

  return (
    <div
      className="main-context-menu"
      onContextMenu={handleContextMenu}
      onClick={removeActiveFolder}
    >
      <Menu
        open={contextMenu !== null}
        onClose={handleOnContextMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        style={{ fontSize: "12px" }}
        className="main-context-menu__item"
      >
        <Paper sx={{ width: 320, maxWidth: "100%" }}>
          <MenuList>
            <MenuItem onClick={() => handleAddNewFile()}>
              <ListItemIcon>
                <CreateNewFolderOutlinedIcon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">New Folder</Typography>
              </ListItemText>
            </MenuItem>

            <MenuItem onClick={() => handleAddNewFile(false)}>
              <ListItemIcon>
                <NoteAddOutlinedIcon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">New File</Typography>
              </ListItemText>
              <Typography fontSize="small">⌘+SHIFT+F</Typography>
            </MenuItem>

            <Divider style={{ margin: "2px 8px 2px 8px" }} />

            {/* <MenuItem
              onClick={handleOnContextMenuClose}
              style={{ cursor: "help" }}
            >
              <ListItemIcon>
                <LightbulbOutlinedIcon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">Get Info</Typography>
              </ListItemText>
            </MenuItem> */}

            <FolderInfoModal onClose={handleOnContextMenuClose} />

            <Divider style={{ margin: "2px 8px 2px 8px" }} />

            <MenuItem onClick={handleOnPaste} disabled={!stagedFile?.stageType}>
              <ListItemIcon>
                <ContentPaste fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">Paste</Typography>
              </ListItemText>
              <Typography fontSize="small">⌘V</Typography>
            </MenuItem>

            <Divider style={{ margin: "2px 8px 2px 8px" }} />

            <MenuItem onClick={handleOnContextMenuClose}>
              <ListItemIcon>
                <PreviewOutlinedIcon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">View</Typography>
              </ListItemText>
              <Typography fontSize="small">
                <KeyboardArrowRightOutlinedIcon />
              </Typography>
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <SortOutlinedIcon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">Sort By</Typography>
              </ListItemText>
              <Typography fontSize="small" onMouseOver={handleMenuMouseOver}>
                <ChevronRightOutlinedIcon style={{ marginLeft: "45px" }} />
              </Typography>
            </MenuItem>
          </MenuList>
        </Paper>
      </Menu>

      <Menu
        onClose={() => setContextSubMenu(null)}
        open={contextSubMenu !== null}
        anchorReference="anchorPosition"
        anchorPosition={
          contextSubMenu !== null
            ? { top: contextSubMenu.mouseY, left: contextSubMenu.mouseX }
            : undefined
        }
        style={{ fontSize: "12px" }}
        className="main-context-menu__item"
      >
        <Paper
          sx={{ width: 320, maxWidth: "100%" }}
          onMouseLeave={handleOnSubMenuClose}
        >
          <MenuList>
            <MenuItem onClick={() => handleOnSort("alphabetically")}>
              <ListItemIcon>
                <AbcOutlinedIcon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">Alphabetically</Typography>
              </ListItemText>
            </MenuItem>

            <MenuItem onClick={() => handleOnSort("folder")}>
              <ListItemIcon>
                <FolderOutlinedIcon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">Folder</Typography>
              </ListItemText>
              {/* <Typography fontSize="small">⌘+SHIFT+F</Typography> */}
            </MenuItem>

            <MenuItem onClick={() => handleOnSort("file")}>
              <ListItemIcon>
                <ArticleOutlinedIcon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">File</Typography>
              </ListItemText>
              {/* <Typography fontSize="small">⌘C</Typography> */}
            </MenuItem>
          </MenuList>
        </Paper>
      </Menu>
      {children}
    </div>
  );
};

export default ContextMenu;
