import { createSlice } from "@reduxjs/toolkit";
import { deleteNode, insertNodes } from "../../utils/treeNode";

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
       updatedPathTree[updatedPathTree.length-1] = updatedSubFolder;

      state.data = updateFolderTree;
      state.subFolder = updatedSubFolder;
      state.pathTree = updatedPathTree;

      state.isLoading = false;
    },

    removeFolder: (state, action) => {
      const fileId = action.payload;

      const updatedFolderTree = deleteNode(state.data, fileId);

      const updateSubFolder = state.subFolder;

      state.data = updatedFolderTree;

      state.subFolder = updateSubFolder.filter(
        (folder) => folder.id !== fileId
      );

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
        state.subFolder = state.pathTree[pathIndex];

        state.pathTree = state.pathTree.slice(0, pathIndex + 1);

        state.path = state.path.slice(0, pathIndex + 1);
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
