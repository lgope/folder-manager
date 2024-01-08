import { FileType, IdType, StagedFileType } from "../../types/interfaces";
import {
  loadFolderData,
  newFolder,
  removeFolder,
  renameFolder,
  setFileToActive,
  setFileToStaged,
  sortSubFolder,
  updateBreadCrumbTree,
  updateChildOnPaste,
  updateFolderColor,
  updateSubFolderData,
  updateOnDuplicate,
} from "../reducers/folderReducer";

import { Dispatch } from "redux";

export const fetchFolderRoot = () => (dispatch: Dispatch) => {
  dispatch(loadFolderData());
};

export const updateSubFolder = (file: FileType) => (dispath: Dispatch) => {
  dispath(updateSubFolderData(file));
};

export const addFolder = (folder: FileType) => (dispatch: Dispatch) => {
  dispatch(newFolder(folder));
};

export const deleteFolder = (id: IdType) => (dispatch: Dispatch) => {
  dispatch(removeFolder(id));
};

export const updateBreadCrumb =
  (pathIndex: number | string) => (dispatch: Dispatch) => {
    dispatch(updateBreadCrumbTree(pathIndex));
  };

export const updateSubFolderOnSorting =
  (sortBy: string) => (dispatch: Dispatch) => {
    dispatch(sortSubFolder(sortBy));
  };

export const updateFolderColorOnChange =
  (id: IdType, color: string) => (dispatch: Dispatch) => {
    dispatch(updateFolderColor({ id, color }));
  };

export const updateFolderName =
  (id: string | number, name: string = "") =>
  (dispatch: Dispatch) => {
    dispatch(renameFolder({ id, name }));
  };

export const addFileToStage = (file: StagedFileType) => (dispatch: Dispatch) => {
  dispatch(setFileToStaged(file));
};

export const addFileToActiveStatus =
  (id: number | string) => (dispatch: Dispatch) => {
    dispatch(setFileToActive(id));
  };

export const updateFileOnPaste =
  (parentId: string | number) => (dispatch: Dispatch) => {
    dispatch(updateChildOnPaste(parentId));
  };

export const updateFileOnDuplicate =
  (file: FileType) => (dispatch: Dispatch) => {
    dispatch(updateOnDuplicate(file));
  };
