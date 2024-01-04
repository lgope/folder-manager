import {
  getFolderRoot,
  newFolder,
  removeFolder,
  updateBreadCrumbTree,
  updateSubFolderData,
} from "../reducers/folderReducer";

import { Dispatch } from "redux";

import { folderTree } from "../../utils/data";

export const fetchFolderRoot = () => (dispatch: Dispatch) => {
  dispatch(getFolderRoot(folderTree));
};

export const updateSubFolder = (file) => (dispath: Dispatch) => {
  dispath(updateSubFolderData(file));
};

export const addFolder = (folder) => (dispatch: Dispatch) => {
  dispatch(newFolder(folder));
};

export const deleteFolder = (id) => (dispatch: Dispatch) => {
  dispatch(removeFolder(id));
};

export const updateBreadCrumb = (pathIndex) => (dispatch: Dispatch) => {
  dispatch(updateBreadCrumbTree(pathIndex));
};
