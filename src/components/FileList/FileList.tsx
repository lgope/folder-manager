import File from "../File/File";
import FileListEmptyMessage from "./FileListEmptyMessage";
import Loader from "../Loader/Loader";
import "./FileList.css";

const FileList = ({ fileList = [] }) => {
  const fileListComponent = fileList.map((file, key) => {
    return (
      <File
      file={file}
        key={file.id}
      />
    );
  });

  return (
    <div className="FileList">
      {fileListComponent.length ? fileListComponent : <FileListEmptyMessage />}
    </div>
  );
};

export default FileList;
