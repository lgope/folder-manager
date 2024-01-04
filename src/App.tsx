import { FC, ReactElement, useEffect, useRef } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";

import Folders from "./components/Folders";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import { selectFolders } from "./redux/reducers/folderReducer";
import { fetchFolderRoot, updateSubFolder } from "./redux/actions/folderAction";
import FileList from "./components/FileList/FileList";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import Loader from "./components/Loader/Loader";
import BreadCrumbText from "./components/BreadCrumb/BreadCrumbText";

const theme = createTheme({
  palette: {
    primary: {
      main: "#746de4",
    },
    secondary: {
      main: green[500],
    },
  },
});

const App: FC = (): ReactElement => {
  const folderData = useSelector(selectFolders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFolderRoot());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <BreadCrumbText />

      {folderData && folderData?.isLoading ? (
        <Loader />
      ) : (
        <FileList fileList={folderData?.subFolder || []} />
      )}
    </ThemeProvider>
  );
};

export default App;
