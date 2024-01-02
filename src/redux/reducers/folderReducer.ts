import { createSlice } from '@reduxjs/toolkit';
import { folderTreeData } from '../../utils/data';
import {merge} from 'lodash'


export const folderReducer = createSlice({
  name: 'folder',
  initialState: {
    data: folderTreeData,
    currentFolderAncestor: {},
    isLoading: true,
  },
  reducers: {
    newFolder: (state, action) => {
      console.log({first: action.payload})

      state.data = action.payload;
      state.isLoading = false;
      console.log({ca: state.currentFolderAncestor})
    },

    removeFolder: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },

    getFolderRoot: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },

    updateRoot: (state, action) => {
      state.currentFolderAncestor = action.payload;
      state.data = action.payload.child;
      state.isLoading = false;
    },
  },
});

export const { getFolderRoot, newFolder, removeFolder, updateRoot } = folderReducer.actions;

// export const selectFolders = (state: { folder: [], isLoading: boolean }) => state.folder;
export const selectFolders = (state) => state.folder;

export default folderReducer.reducer;
