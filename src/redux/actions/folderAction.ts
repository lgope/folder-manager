import {
  getFolderRoot,
  newFolder,
  removeFolder,
  updateRoot,
  updateSubFolderData,
} from "../reducers/folderReducer";

import { Dispatch } from "redux";

import { folderData } from "../../utils/data";

export const fetchFolderRoot = () => (dispatch: Dispatch) => {
  dispatch(getFolderRoot(folderData));
};

export const updateSubFolder = (path, subFolder) => (dispath: Dispatch) => {
  dispath(updateSubFolderData({ path, subFolder }));
};

export const updateFolderRoot = (data) => (dispatch: Dispatch) => {
  dispatch(updateRoot(data));
};

export const addFolder = (subFolder, folderData) => (dispatch: Dispatch) => {
  dispatch(newFolder({ subFolder, folderData }));
};

export const deleteFolder = (subFolder, fulderData) => (dispatch: Dispatch) => {
  dispatch(removeFolder({ subFolder, fulderData }));
};
