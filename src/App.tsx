import { FC, ReactElement, useEffect } from "react";
import Folders from "./components/Folders";
import "./App.css";

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import { selectFolders } from "./redux/reducers/folderReducer";
import { fetchFolderRoot, updateSubFolder } from "./redux/actions/folderAction";

const App: FC = (): ReactElement => {
  const folderData = useSelector(selectFolders);
  const dispatch = useDispatch();

  console.log({folderData})

  useEffect(() => {
    dispatch(fetchFolderRoot());
  }, [dispatch]);

  const handlePath = (index: number) => {
    if (index === 0) {
      dispatch(updateSubFolder([], folderData.data));
    } else {
      const updatedPath = folderData.path.slice(0, index);

      let subFolder = folderData.data[updatedPath[0]];
      updatedPath.shift();
      updatedPath.forEach((pathName) => {
        subFolder = subFolder.child[pathName];
      });

      dispatch(
        updateSubFolder(folderData.path.slice(0, index), subFolder.child)
      );
    }
  };

  return (
    <div className="App">
      {folderData && folderData?.isLoading ? (
        <h2>Loading....</h2>
      ) : (
        <div className="folder-root-data">
          <div className="folder-path">
            <button onClick={() => handlePath(0)} value={"home"}>
              :home
            </button>
            {folderData.path.map((pathName, index) => (
              <button
                onClick={() => handlePath(index)}
                key={index}
                value={pathName}
              >
                {" "}
                / {pathName}
              </button>
            ))}
          </div>
          <Folders folders={folderData?.subFolder || {}} />
        </div>
      )}
    </div>
  );
};

export default App;
