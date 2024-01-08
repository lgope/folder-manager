import File from "../File/File";
import FileListEmptyMessage from "./FileListEmptyMessage";
import "./FileList.css";
import { FileType } from "../../types/interfaces";

const FileList = ({ fileList = [] }: { fileList: FileType[] }) => {
  const fileListComponent = fileList.map((file, idx) => {
    return <File file={file} key={file.id} index={idx} />;
  });

  return (
    <>
      {fileListComponent.length ? (
        <div className="files-panel"> {fileListComponent} </div>
      ) : (
        <FileListEmptyMessage />
      )}
    </>
  );
};

export default FileList;
