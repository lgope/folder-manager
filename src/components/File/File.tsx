import { useState } from "react";

import { updateSubFolder } from "../../redux/actions/folderAction";
import { useDispatch } from "react-redux";
import FileActions from "./FileActions";

import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import "./File.css";


const File = ({ file, index }) => {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const dispatch = useDispatch();

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleClick = () => {
    if (file.isFolder) {
      dispatch(updateSubFolder({ ...file, index }));
    }
  };

  return (
    <div
      style={{
        position: contextMenu ? "relative" : "static",
        cursor: "context-menu",
      }} // Setting position according to the modal state
      className={`folder-panel files-panel__item folder ${
        contextMenu !== null ? "folder-active" : ""
      }`}
      onDoubleClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <div className="folder-icon">
        {file.isFolder ? (
          <FolderIcon style={{ color: file.color }} />
        ) : (
          <InsertDriveFileIcon style={{ color: file.color }} />
        )}

        <p className="files-panel__item-title">{file.name}</p>
      </div>

      <FileActions
        file={file}
        contextMenu={contextMenu}
        handleClose={handleClose}
        handleOpenFolder={handleClick}
      />
    </div>
  );
};

export default File;
