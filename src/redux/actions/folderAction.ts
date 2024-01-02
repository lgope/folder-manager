import {
  getFolderRoot,
  newFolder,
  removeFolder,
  updateRoot,
} from "../reducers/folderReducer";

import { Dispatch } from "redux";
import { v4 as uuidv4 } from "uuid";

import { folderTreeData } from "../../utils/data";

export const fetchFolderRoot = () => (dispatch: Dispatch) => {
  dispatch(getFolderRoot(folderTreeData));
};

export const updateFolderRoot = (data) => (dispatch: Dispatch) => {
  dispatch(updateRoot(data));
}

export const addFolder = (body) => (dispatch: Dispatch) => {
  const updatedFt = updateFolderTree(folderTreeData, {
    _id: uuidv4(),
    name: body.name,
    ancestor: body.ancestor,
    child: [],
    designation: "folder",
  }, "add");

  // console.log({updatedFt})

  dispatch(newFolder(updatedFt));
};

export const backWardFolder = (ancestor) => (dispatch: Dispatch) => {

  const updatedFt = findFolderAncestor(folderTreeData, ancestor._id);

  console.log({updatedFt})

  // dispatch(removeFolder(updatedFt));
}

export const deleteFolder = (body) => (dispatch: Dispatch) => {
  // { id: folder._id, ancestor: folder.ancestor }

  const updatedFt = updateFolderTree(folderTreeData, body, "delete");

  dispatch(removeFolder(updatedFt));
};

const updateFolderTree = (ft, newFolder, method="add") => {
  const root = JSON.parse(JSON.stringify(ft));

  let updateNewFolder: [] = [];

  const updateRoot = (data) => {
    data.map((ch) => {

      if (ch._id.toString() === newFolder.ancestor.toString()) {
      console.log({ ch });


        ch.child = method === "add" ? [...ch.child, newFolder]: ch.child.filter(
          folder => folder._id.toString() !== newFolder._id.toString()
        );

        updateNewFolder = ch.child;

      } else if (ch.child.length > 0) updateRoot(ch.child);
    });
  };

  updateRoot(root);

  return updateNewFolder;
};

const findFolderAncestor = (ft, ancestorId) => {
  const root = JSON.parse(JSON.stringify(ft));
  let currentFolderAncestor: [] = [];

  const findRoot = (data) => {
    data.map((ch) => {

      if (ch._id.toString() === ancestorId.toString()) {

        currentFolderAncestor = findFolderAncestor(ft, ch.ancestor);

      } else if (ch.child.length > 0) findRoot(ch.child);
    });
  };

  findRoot(root);

  return currentFolderAncestor;
}

