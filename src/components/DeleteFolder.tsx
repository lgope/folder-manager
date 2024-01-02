import { useState } from 'react';
import { Icon, Button } from '../Styles';
import Popup from './popup';

// redux stuff
import { useDispatch } from 'react-redux';
import { deleteFolder } from '../redux/actions/folderAction';

// types
import {IFolder} from '../types/interfaces';

const DeleteFolder = ({ folder }: IFolder) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const togglePopup = (e: any) => setIsOpen(!isOpen);

  const onSubmit = (e: any) => {
    e.preventDefault();

    dispatch(deleteFolder({ _id: folder._id, ancestor: folder.ancestor }));

    setIsOpen(false);
  };

  return (
    <>
      <Icon color='#F73859' onClick={togglePopup} className='far fa-times-circle'>
      </Icon>
      <Popup isOpen={isOpen} onClose={togglePopup}>
        <form onSubmit={onSubmit}>
        <div className='popup-body'>
          <h4 className='title'>Delete `{folder.name}`</h4>
        </div>
          <div className='popup-action'>
            <Button type='button' color='#a6e39a' onClick={togglePopup}>
              Cancel
            </Button>
            <Button color='#eba7b2' type='submit'>
              Delete
            </Button>
          </div>
        </form>
      </Popup>
    </>
  );
};

export default DeleteFolder;
