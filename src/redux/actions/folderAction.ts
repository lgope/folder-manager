import {
  getFolderRoot,
  newFolder,
  removeFolder,
  sortSubFolder,
  updateBreadCrumbTree,
  updateFolderColor,
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

export const updateBreadCrumb = (pathIndex: number | string) => (dispatch: Dispatch) => {
  dispatch(updateBreadCrumbTree(pathIndex));
};

export const updateSubFolderOnSorting = (sortBy: string) => (dispatch: Dispatch) => {
  dispatch(sortSubFolder(sortBy));
}

export const updateFolderColorOnChange = (id, color) => (dispatch: Dispatch) => {
  dispatch(updateFolderColor({id, color}));
}