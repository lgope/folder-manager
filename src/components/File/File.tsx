import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
  addFileToStage,
  updateFolderName,
  updateSubFolder,
} from "../../redux/actions/folderAction";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import FileActions from "./FileActions";
import { truncateStr } from "../../utils/data";

import "./File.css";

const File = ({ file, index }) => {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const [enableRename, setEnableRename] = useState(false);

  const dispatch = useDispatch();
  const nameInputRef = useRef<HTMLParagraphElement>(null);
  const stageFileOpacity = useRef<string | number>(1);

  useEffect(() => {
    if (enableRename) {
      const el: any = nameInputRef.current;

      // focus input area
      el?.focus();

      // set curson to last position of the folder name
      const range = document.createRange();
      const selection: any = window.getSelection();

      range.setStart(el, el?.childNodes.length);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [enableRename]);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
    stageFileOpacity.current = 1;
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleClick = () => {
    if (file.isFolder) {
      dispatch(updateSubFolder({ ...file, index }));
    }
  };

  const updateFolderNewName = () => {
    if (nameInputRef.current !== null) {
      const newName: string = (nameInputRef.current.textContent || "").trim();

      if (file.name === newName) return null;

      nameInputRef.current.textContent = truncateStr(newName);
      dispatch(updateFolderName(file.id, newName));
    }
  };

  const renameOnBlur = () => {
    updateFolderNewName();
    setEnableRename(false);
  };

  const onFolderRename: React.KeyboardEventHandler<HTMLParagraphElement> = (
    e
  ) => {
    if (e.nativeEvent.key === "Enter") {
      updateFolderNewName();

      setEnableRename(false);
    }
  };

  const handleOnRenameFolder = () => {
    setContextMenu(null);
    setEnableRename(true);
  };

  const handleOnCopyFolder = () => {
    dispatch(addFileToStage({ stageType: "copy", file }));
    setContextMenu(null);
  };

  const handleOnCutFolder = () => {
    stageFileOpacity.current = 0.4;
    dispatch(addFileToStage({ stageType: "cut", file }));
    setContextMenu(null);
  };

  return (
    <div
      style={{
        position: contextMenu ? "relative" : "static",
        cursor: "context-menu",
        opacity: stageFileOpacity.current,
      }}
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

        <p
          className="files-panel__item-title"
          title={file.name}
          contentEditable={enableRename}
          onBlur={renameOnBlur}
          onKeyUp={onFolderRename}
          ref={nameInputRef}
          suppressContentEditableWarning={true}
        >
          {truncateStr(file.name)}
        </p>
      </div>

      <FileActions
        file={file}
        contextMenu={contextMenu}
        handleClose={handleClose}
        handleOpenFolder={handleClick}
        handleOnRenameFolder={handleOnRenameFolder}
        handleOnCopyFolder={handleOnCopyFolder}
        handleOnCutFolder={handleOnCutFolder}
      />
    </div>
  );
};

export default File;
