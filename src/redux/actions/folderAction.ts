import {
  getFolderRoot,
  newFolder,
  removeFolder,
  updateBreadCrumbTree,
  updateRoot,
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

export const updateFolderRoot = (data) => (dispatch: Dispatch) => {
  dispatch(updateRoot(data));
};

export const addFolder = (folder) => (dispatch: Dispatch) => {
  dispatch(newFolder(folder));
};

export const deleteFolder = (subFolder, fulderData) => (dispatch: Dispatch) => {
  dispatch(removeFolder({ subFolder, fulderData }));
};

export const updateBreadCrumb = (pathIndex) => (dispatch: Dispatch) => {
  dispatch(updateBreadCrumbTree(pathIndex))
}
