import React, { useState } from 'react';
import Folders from './Folders';
import { Icon, FolderLi } from '../Styles';
import NewFolder from './NewFolder';
import DeleteFolder from './DeleteFolder';

// types
import { IFolder } from '../types/interfaces';

const Folder = ({ folder }: IFolder) => {
  const [showChild, setShowChild] = useState(false);
  const hasChild = folder?.child?.length ? true : false;

  const toggleShowChild = () => {
    setShowChild(!showChild);
  };

  return (
    <FolderLi>
      <div className={`folder-info ${hasChild && showChild && 'active'}`}>
        <div className={`folder-toggler ${showChild && 'active'}`}>
          <Icon className='fas fa-caret-right'></Icon>
        </div>

        <div className='folder-name' onClick={toggleShowChild}>
          <Icon className='fas fa-folder'></Icon>
          <span>{folder.name}</span>

          <span className="delete-action" title="Delete Folder">
          {folder.designation !== 'root' && <DeleteFolder folder={folder} />}
          </span>
        </div>

        <div className='new-folder-action'>
          <NewFolder parentFolder={folder} />
        </div>
      </div>

      {!!folder.child.length && showChild && <Folders folders={folder.child} />}
      {!folder.child.length && showChild && (
        <ul className='folder-data'> - No Folders</ul>
      )}
    </FolderLi>
  );
};

export default Folder;
