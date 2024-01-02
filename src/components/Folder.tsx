import React, { useState } from "react";
import Folders from "./Folders";
import { Icon, FolderLi } from "../Styles";
import NewFolder from "./NewFolder";
import DeleteFolder from "./DeleteFolder";

// types
import { IFolder } from "../types/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { updateSubFolder } from "../redux/actions/folderAction";
import { selectFolders } from "../redux/reducers/folderReducer";

const Folder = ({ folder }: IFolder) => {
  const folderData = useSelector(selectFolders);
  const dispatch = useDispatch();

  const handleFolderClick = () => {
    // console.log({ folderData });
    // let allData = folderData.data;
    const path = [...folderData.path, folder];
    let subFolder = folderData.data[path[0]];

    // console.log({ path, subFolder });
    path.shift()
    path.forEach((pathName) => {
      // console.log({ pathName });
      // console.log({ subFolder: subFolder.child[pathName] });
      subFolder = subFolder.child[pathName];
    });

    // console.log({ subFolder: subFolder });

    dispatch(updateSubFolder([...folderData.path, folder], subFolder.child));
  };

  return (
    <div className="folder">
      {/* <span className="delete-action" title="Delete Folder">
        {folder.designation !== "root" && <DeleteFolder folder={folder} />}
      </span> */}

      <div className="folder" onClick={handleFolderClick}>
        <Icon className="fas fa-folder"></Icon>
        <span>{folder}</span>
      </div>
    </div>
  );
};

export default Folder;
