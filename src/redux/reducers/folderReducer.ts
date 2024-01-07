import { createSlice } from "@reduxjs/toolkit";
import {
  deleteNode,
  editNode,
  insertNodes,
  updateNodeColor,
  updateNodeOnSort,
  updatePathTree,
  updateSubFolderTree,
} from "../../utils/traverseTree";
import { folderTree } from "../../utils/data";
import { reHydrateStore } from "../../utils/localStorage";

export const folderReducer = createSlice({
  name: "folder",
  initialState: {
    data: folderTree,
    subFolder: folderTree.child,
    path: [],
    pathTree: [],
    isLoading: true,
    ...(reHydrateStore()?.folder || {}),
    stagedFile: {}, // This key is used for copy and cut files. Doesn't need to save in local storage.
    activeFolder: { id: "", editable: false },
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

      state.activeFolder = { id: newFolderData.id, editable: true };
      state.isLoading = false;
    },

    removeFolder: (state, action) => {
      const fileId = action.payload;

      const updatedFolderTree = deleteNode(state.data, fileId);

      // update path tree
      const newPathTree = updatePathTree(updatedFolderTree, state.path);
      const updatedSubFolder = updateSubFolderTree(
        updatedFolderTree,
        state.path
      );

      state.data = updatedFolderTree;
      state.subFolder = updatedSubFolder;
      state.pathTree = newPathTree;

      state.isLoading = false;
    },

    loadFolderData: (state) => {
      if (Object.keys(state.data).length) state.isLoading = false;

      // clear active folder and stage file
      state.activeFolder = { id: "", editable: false };
      state.stagedFile = {};
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

        // TODO: Resolve sort by folder issue
        case "folder":
          sortedSubFolder = sortedSubFolder.toSorted(
            (a, b) => a.name.localeCompare(b.name) - (a.isFolder ? -1 : 1)
          );
          break;

        case "file":
          sortedSubFolder = sortedSubFolder.toSorted((a, b) =>
            a.isFolder ? 1 : -1
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

    updateFolderColor: (state, action) => {
      const { id, color } = action.payload;

      const updatedRoot = updateNodeColor(state.data, id, color);
      const updatedSubFolder = updateSubFolderTree(updatedRoot, state.path);
      const newPathTree = updatePathTree(updatedRoot, state.path);

      state.data = updatedRoot;
      state.subFolder = updatedSubFolder;
      state.pathTree = newPathTree;

      state.isLoading = false;
    },

    renameFolder: (state, action) => {
      const { id, name } = action.payload;

      const updatedFolderTree = editNode(state.data, id, name);
      const updatedSubFolder = updateSubFolderTree(
        updatedFolderTree,
        state.path
      );
      const newPathTree = updatePathTree(updatedFolderTree, state.path);

      state.data = updatedFolderTree;
      state.subFolder = updatedSubFolder;
      state.pathTree = newPathTree;

      state.activeFolder = {};
      state.isLoading = false;
    },

    setFileToStaged: (state, action) => {
      const file = action.payload;

      state.stagedFile = file;

      state.isFolder = false;
    },

    setFileToActive: (state, action) => {
      const id = action.payload;

      state.activeFolder = { id, editable: false };
    },
  },
});

export const {
  loadFolderData,
  newFolder,
  removeFolder,
  updateSubFolderData,
  updateBreadCrumbTree,
  sortSubFolder,
  updateFolderColor,
  renameFolder,
  setFileToStaged,
  setFileToActive,
} = folderReducer.actions;

// export const selectFolders = (state: { folder: [], isLoading: boolean }) => state.folder;
export const selectFolders = (state: any) => state.folder;

export default folderReducer.reducer;
