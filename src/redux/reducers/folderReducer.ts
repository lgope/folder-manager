import { createSlice } from '@reduxjs/toolkit';

export const folderReducer = createSlice({
  name: 'folder',
  initialState: {
    data: null,
    subFolder: null,
    path: [],
    isLoading: true,
  },
  reducers: {
    newFolder: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },

    removeFolder: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },

    getFolderRoot: (state, action) => {
      state.data = action.payload;
      state.subFolder = action.payload;
      state.isLoading = false;
    },

    updateRoot: (state, action) => {
      // state.currentFolderAncestor = action.payload;
      state.data = action.payload.child;
      state.isLoading = false;
    },

    updateSubFolderData: (state, action) => {
      state.path = action.payload.path;
      state.subFolder = action.payload.subFolder;
    },

    updatePath: (state, action) => {
      state.path = action.payload;
      state.subFolder = action.payload;
    }
  },
});

export const { getFolderRoot, newFolder, removeFolder, updateRoot, updateSubFolderData } = folderReducer.actions;

// export const selectFolders = (state: { folder: [], isLoading: boolean }) => state.folder;
export const selectFolders = (state) => state.folder;

export default folderReducer.reducer;
