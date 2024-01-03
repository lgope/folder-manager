import Folder from "./Folder";
import NewFolder from "./NewFolder";

const FolderTree = ({ folders }: any) => {

  return (
    <div className="folder-container">
      {Object.keys(folders).length ? (
        Object.keys(folders).map((folder) => (
          <Folder key={folder} folder={folder} />
        ))
      ) : (
        <ul className="folder-data"> - No Folders</ul>
      )}

      <div className="new-folder-action">
        <NewFolder />
      </div>
    </div>
  );
};

export default FolderTree;
