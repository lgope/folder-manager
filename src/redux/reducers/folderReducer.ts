import { createSlice } from "@reduxjs/toolkit";
import { deleteNode, insertNodes } from "../../utils/traverseTree";

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

      if (newFolderData.parentId !== "root") {
        // update path tree last index data
        const updatedPathTree = [...state.pathTree];

        // update path tree prev last index child data on adding new folder
        if (updatedPathTree.length >= 2) {

          const path = state.path;

          const pathLastIndex = path[path.length - 1].index;
          const pathTreePrevLastIndex = updatedPathTree.length - 2;
          updatedPathTree[pathTreePrevLastIndex][pathLastIndex].child = updatedSubFolder;
        }

        updatedPathTree[updatedPathTree.length - 1] = updatedSubFolder;
        state.pathTree = updatedPathTree;
      }

      state.data = updateFolderTree;
      state.subFolder = updatedSubFolder;

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

      // update path tree prev last index child data on adding new folder
      if (updatedPathTree.length >= 2) {

        const path = state.path;

        const pathLastIndex = path[path.length - 1].index;
        const pathTreePrevLastIndex = updatedPathTree.length - 2;
        updatedPathTree[pathTreePrevLastIndex][pathLastIndex].child = updateSubFolder;
      }

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

      // add new path
      updatedPath.push({ id: file.id, name: file.name, index: file.index });

      // add child to path tree as array item
      updatedPathTree.push(file.child);

      state.path = updatedPath;
      state.pathTree = updatedPathTree;
      state.subFolder = file.child;
    },

    updateBreadCrumbTree: (state, action) => {
      const pathIndex = action.payload;

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
