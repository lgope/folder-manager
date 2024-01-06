import { configureStore } from "@reduxjs/toolkit";
import folderReducer from "./reducers/folderReducer";
import { localStorageMiddleware, reHydrateStore } from "../utils/localStorage";

export default configureStore({
  reducer: {
    folder: folderReducer,
  },

  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
