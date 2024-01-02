import { configureStore } from '@reduxjs/toolkit';
import folderReducer from './reducers/folderReducer';

export default configureStore({
  reducer: {
    folder: folderReducer,
  },
});
