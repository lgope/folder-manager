import { IFolder } from '../types/interfaces';
import Folder from './Folder';

const FolderTree = ({folders}: any)  => (
    <div className='folder-tree'>
        <ul>
          {folders.map((folder) => (
            <Folder key={folder._id} folder={folder} />
          ))}
        </ul>
    </div>
  );

export default FolderTree;
