import { FC, ReactElement, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

import "./App.css";

import Navbar from "./components/Navbar/Navbar";

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import { selectFolders } from "./redux/reducers/folderReducer";
import { fetchFolderRoot } from "./redux/actions/folderAction";
import FileList from "./components/FileList/FileList";
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
  const [searchValue, setSearchValue] = useState("");

  const folderData = useSelector(selectFolders);
  const dispatch = useDispatch();

  let filteredSubFolderData = [];

  useEffect(() => {
    dispatch(fetchFolderRoot());
  }, [dispatch]);


  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchValue(value);
  };

  if (folderData?.subFolder) {
    filteredSubFolderData = folderData.subFolder.filter((file) =>
    file.name.toLowerCase().includes(searchValue.toLowerCase()));
  }

  return (
    <ThemeProvider theme={theme}>
      <Navbar handleOnSearch={handleOnSearch} />
      <BreadCrumbText />

      {folderData && folderData?.isLoading ? (
        <Loader />
      ) : (
        <FileList fileList={filteredSubFolderData} />
      )}
    </ThemeProvider>
  );
};

export default App;
