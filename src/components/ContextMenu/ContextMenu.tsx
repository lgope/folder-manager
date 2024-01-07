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
import { useDispatch } from "react-redux";
import { updateSubFolderOnSorting } from "../../redux/actions/folderAction";

const ContextMenu = ({ children }: { children: ReactElement }) => {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const [contextSubMenu, setContextSubMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

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

  return (
    <div className="main-context-menu" onContextMenu={handleContextMenu}>
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
            <MenuItem onClick={handleOnContextMenuClose}>
              <ListItemIcon>
                <CreateNewFolderOutlinedIcon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">New Folder</Typography>
              </ListItemText>
            </MenuItem>

            <MenuItem onClick={handleOnContextMenuClose}>
              <ListItemIcon>
                <NoteAddOutlinedIcon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">New File</Typography>
              </ListItemText>
              <Typography fontSize="small">⌘+SHIFT+F</Typography>
            </MenuItem>

            <Divider style={{ margin: "2px 8px 2px 8px" }} />

            <MenuItem
              onClick={handleOnContextMenuClose}
              style={{ cursor: "help" }}
            >
              <ListItemIcon>
                <LightbulbOutlinedIcon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize="small">Get Info</Typography>
              </ListItemText>
              {/* <Typography fontSize="small">⌘C</Typography> */}
            </MenuItem>

            <Divider style={{ margin: "2px 8px 2px 8px" }} />

            <MenuItem onClick={handleOnContextMenuClose}>
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
                <ChevronRightOutlinedIcon style={{marginLeft: "45px"}} />
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
