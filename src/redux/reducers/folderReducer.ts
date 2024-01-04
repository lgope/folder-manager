import { createSlice } from "@reduxjs/toolkit";
import { deleteNode, insertNodes } from "../../utils/treeNode";

// TODO: update path tree data with child on add, delete and update folder

export const folderReducer = createSlice({
  name: "folder",
  initialState: {
    data: null,
    subFolder: [],
    path: [],
    pathTree: [],
    isLoading: true,
  },
  reducers: {
    newFolder: (state, action) => {
      const newFolderData = action.payload;

      const updateFolderTree = insertNodes(
        state.data,
        newFolderData.parentId,
        newFolderData
      );

      const updatedSubFolder = state.subFolder;
      updatedSubFolder.push(newFolderData);

      // update path tree last index data
      const updatedPathTree = [...state.pathTree];
      updatedPathTree[updatedPathTree.length - 1] = updatedSubFolder;

      state.data = updateFolderTree;
      state.subFolder = updatedSubFolder;
      state.pathTree = updatedPathTree;

      state.isLoading = false;
    },

    removeFolder: (state, action) => {
      const fileId = action.payload;

      const updatedFolderTree = deleteNode(state.data, fileId);

      let updateSubFolder = state.subFolder;
      updateSubFolder = updateSubFolder.filter(
        (folder) => folder.id !== fileId
      );

      // update path tree last index data
      const updatedPathTree = state.pathTree;

      updatedPathTree[updatedPathTree.length - 1] = [updateSubFolder];

      state.data = updatedFolderTree;

      state.subFolder = updateSubFolder;

      state.pathTree = updatedPathTree;

      state.isLoading = false;
    },

    getFolderRoot: (state, action) => {
      state.data = action.payload;
      state.subFolder = action.payload.child;
      state.isLoading = false;
    },

    updateSubFolderData: (state, action) => {
      const updatedPath = state.path;
      const updatedPathTree = state.pathTree;

      const file = action.payload;

      console.log(file);

      // add new path
      updatedPath.push({ id: file.id, name: file.name });

      // add child to path tree as array item
      updatedPathTree.push(file.child);

      state.path = updatedPath;
      state.pathTree = updatedPathTree;
      state.subFolder = file.child;
    },

    updateBreadCrumbTree: (state, action) => {
      const pathIndex = action.payload;

      // console.log({pathIndex})

      if (pathIndex === "home") {
        state.subFolder = state.data.child;

        state.pathTree = [];

        state.path = [];
      } else {
        const updatedSubFolder = state.subFolder;

        const updatedPathTree = state.pathTree;

        const updatedPath = state.path;

        state.subFolder = updatedPathTree[pathIndex];

        state.pathTree = updatedPathTree.slice(0, pathIndex + 1);

        state.path = updatedPath.slice(0, pathIndex + 1);
      }
    },
  },
});

export const {
  getFolderRoot,
  newFolder,
  removeFolder,
  updateSubFolderData,
  updateBreadCrumbTree,
} = folderReducer.actions;

// export const selectFolders = (state: { folder: [], isLoading: boolean }) => state.folder;
export const selectFolders = (state) => state.folder;

export default folderReducer.reducer;
