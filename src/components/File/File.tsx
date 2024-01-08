import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addFileToActiveStatus,
  addFileToStage,
  updateFolderName,
  updateSubFolder,
} from "../../redux/actions/folderAction";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Swal from "sweetalert2";

import FileActions from "./FileActions";
import { isNameExits, truncateStr } from "../../utils/data";

import "./File.css";
import { selectFolders } from "../../redux/reducers/folderReducer";
import { FileComProps } from "../../types/interfaces";


const File = ({ file, index }: FileComProps) => {
  const folderData = useSelector(selectFolders);
  const { activeFolder, subFolder, stagedFile } = folderData;

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const [enableRename, setEnableRename] = useState(
    (activeFolder.id === file.id && activeFolder?.editable) || false
  );

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

    // update active foder
    updateActiveFolder(event);

    // set context menu position
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

  const handleOnOpenFolder = () => {
    if (file.isFolder) {
      dispatch(updateSubFolder({ ...file, index }));
    }
  };

  const updateFolderNewName = () => {
    if (nameInputRef.current !== null) {
      const newName: string = (nameInputRef.current.textContent || "").trim();

      if (file.name !== newName && isNameExits(subFolder, newName)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `The name "${newName}" is already taken. Please choose a different name.`,
        });
        nameInputRef.current.textContent = file.name;
      } else if (file.name === newName) {
        nameInputRef.current.textContent = file.name;
        return null;
      } else {
        nameInputRef.current.textContent = truncateStr(newName);
        dispatch(updateFolderName(file.id, newName));
      }
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
    dispatch(addFileToStage({ stageType: "cut", file }));
    setContextMenu(null);
  };

  const updateActiveFolder = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (activeFolder.id !== file.id) {
      dispatch(addFileToActiveStatus(file.id));
    }
  };

  stageFileOpacity.current =
    stagedFile?.stageType === "cut" && stagedFile?.file?.id === file.id
      ? 0.4
      : 1;

  return (
    <div
      style={{
        position: contextMenu ? "relative" : "static",
        cursor: "context-menu",
        opacity: stageFileOpacity.current,
      }}
      className={`folder-panel files-panel__item folder ${
        contextMenu !== null || activeFolder.id === file.id || enableRename
          ? "folder-active"
          : ""
      }`}
      onDoubleClick={handleOnOpenFolder}
      onContextMenu={handleContextMenu}
      onClick={updateActiveFolder}
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
          {/* {truncateStr(file.name)} */}
          {file.name}
        </p>
      </div>

      <FileActions
        file={file}
        contextMenu={contextMenu}
        handleClose={handleClose}
        handleOpenFolder={handleOnOpenFolder}
        handleOnRenameFolder={handleOnRenameFolder}
        handleOnCopyFolder={handleOnCopyFolder}
        handleOnCutFolder={handleOnCutFolder}
      />
    </div>
  );
};

export default File;
