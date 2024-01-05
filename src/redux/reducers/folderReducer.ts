import { createSlice } from "@reduxjs/toolkit";
import {
  deleteNode,
  insertNodes,
  updateNodeOnSort,
  updatePathTree,
} from "../../utils/traverseTree";

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
        const newPathTree = updatePathTree(updateFolderTree, state.path);

        state.pathTree = newPathTree;
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

      // update path tree
      const newPathTree = updatePathTree(updatedFolderTree, state.path);

      state.pathTree = newPathTree;

      state.data = updatedFolderTree;

      state.subFolder = updateSubFolder;

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
        const updatedPathTree = state.pathTree;

        const updatedPath = state.path;

        state.subFolder = updatedPathTree[pathIndex];

        state.pathTree = updatedPathTree.slice(0, pathIndex + 1);

        state.path = updatedPath.slice(0, pathIndex + 1);
      }
    },

    sortSubFolder: (state, action) => {
      const sortBy = action.payload;

      let sortedSubFolder = state.subFolder || [];

      switch (sortBy) {
        case "alphabetically":
          sortedSubFolder = sortedSubFolder.toSorted((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;

        default:
          break;
      }

      const updatedRoot = updateNodeOnSort(
        state.data,
        sortedSubFolder[0].parentId,
        sortedSubFolder
      );

      // update path tree
      const newPathTree = updatePathTree(updatedRoot, state.path);

      state.pathTree = newPathTree;

      state.data = updatedRoot;
      state.subFolder = sortedSubFolder;
      state.isLoading = false;
    },
  },
});

export const {
  getFolderRoot,
  newFolder,
  removeFolder,
  updateSubFolderData,
  updateBreadCrumbTree,
  sortSubFolder,
} = folderReducer.actions;

// export const selectFolders = (state: { folder: [], isLoading: boolean }) => state.folder;
export const selectFolders = (state) => state.folder;

export default folderReducer.reducer;
