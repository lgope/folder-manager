import { createSlice } from '@reduxjs/toolkit';
import {insertNodes} from '../../utils/treeNode'

export const folderReducer = createSlice({
  name: 'folder',
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

      // console.log(finalStructure)
      state.data = updateFolderTree;
      state.subFolder = [...state.subFolder, newFolderData];
      
      state.isLoading = false;
    },

    removeFolder: (state, action) => {
      state.data = action.payload.fulderData;
      
      state.subFolder = action.payload.subFolder;

      state.isLoading = false;
    },

    getFolderRoot: (state, action) => {
      state.data = action.payload;
      state.subFolder = action.payload.child;
      state.isLoading = false;
    },

    updateRoot: (state, action) => {
      state.data = action.payload.child;
      state.isLoading = false;
    },

    updateSubFolderData: (state, action) => {
      const updatedPath = state.path;
      const updatedPathTree = state.pathTree;
      const file = action.payload;

      // add new path
      updatedPath.push({id: file.id, name: file.name})

      // add child to path tree as array item
      updatedPathTree.push(file.child);

      console.log({updatedPath, updatedPathTree})
      state.path = updatedPath;
      state.pathTree = updatedPathTree;
      state.subFolder = file.child;
    },

    updatePath: (state, action) => {
      state.path = action.payload;
      state.subFolder = action.payload;
    },

    updateBreadCrumbTree: (state, action) => {
      const pathIndex = action.payload;

      if (pathIndex === "home") {
        state.subFolder = state.data.child;

        state.pathTree = [];
  
        state.path = [];
      } else {
        state.subFolder = state.pathTree[pathIndex];

        state.pathTree = state.pathTree.slice(0, pathIndex+1);
  
        state.path = state.path.slice(0, pathIndex+1);
      }
    }
  },
});

export const { getFolderRoot, newFolder, removeFolder, updateRoot, updateSubFolderData, updateBreadCrumbTree } = folderReducer.actions;

// export const selectFolders = (state: { folder: [], isLoading: boolean }) => state.folder;
export const selectFolders = (state) => state.folder;

export default folderReducer.reducer;
