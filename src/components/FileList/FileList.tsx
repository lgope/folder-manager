import File from "../File/File";
import FileListEmptyMessage from "./FileListEmptyMessage";
import "./FileList.css";

const FileList = ({ fileList = [] }) => {
  const fileListComponent = fileList.map((file, idx) => {
    return <File file={file} key={file.id} index={idx} />;
  });

  return (
    <div className="FileList">
      {fileListComponent.length ? fileListComponent : <FileListEmptyMessage />}
    </div>
  );
};

export default FileList;
