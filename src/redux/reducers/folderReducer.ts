import { createSlice } from '@reduxjs/toolkit';
import { updateFolderTree } from '../../utils/data';
import { v4 as uuidv4 } from 'uuid';


export const folderReducer = createSlice({
  name: 'folder',
  initialState: {
    data: null,
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
      console.log({pay: action.payload})
      state.data = action.payload;
      state.isLoading = false;
    },
  },
});

export const { getFolderRoot, newFolder, removeFolder } = folderReducer.actions;

// export const selectFolders = (state: { folder: [], isLoading: boolean }) => state.folder;
export const selectFolders = (state) => state.folder;

export default folderReducer.reducer;
