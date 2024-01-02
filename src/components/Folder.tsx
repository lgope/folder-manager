import React, { useState } from "react";
import Folders from "./Folders";
import { Icon, FolderLi } from "../Styles";
import NewFolder from "./NewFolder";
import DeleteFolder from "./DeleteFolder";

// types
import { IFolder } from "../types/interfaces";
import { useDispatch } from "react-redux";
import { updateFolderRoot } from "../redux/actions/folderAction";

const Folder = ({ folder }: IFolder) => {
  const dispatch = useDispatch();

  const handleFolderClick = () => {
    dispatch(updateFolderRoot(folder));
  };

  return (
    <div className="folder">
      <span className="delete-action" title="Delete Folder">
        {folder.designation !== "root" && <DeleteFolder folder={folder} />}
      </span>

      <div className="folder" onClick={handleFolderClick}>
        <Icon className="fas fa-folder"></Icon>
        <span>{folder.name}</span>
      </div>
    </div>
  );
};

export default Folder;
