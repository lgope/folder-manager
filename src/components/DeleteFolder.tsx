import { useState } from "react";
import { Icon, Button } from "../Styles";
import Popup from "./popup";

import unset from 'lodash/fp/unset'

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { deleteFolder } from "../redux/actions/folderAction";

// types
import { selectFolders } from "../redux/reducers/folderReducer";

const DeleteFolder = ({ folder }: { folder: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const folderData = useSelector(selectFolders);
  const dispatch = useDispatch();

  const togglePopup = (e: any) => setIsOpen(!isOpen);

  const updatedSubFulder = {...folderData.subFolder};

  const onSubmit = (e: any) => {
    e.preventDefault();

    let patharr = folderData.path;

    let str = patharr[0];

    if (patharr.length > 1) {
      patharr = folderData.path.slice(1);

      patharr.forEach((cpath: string) => {
        str = str + `.child.${cpath}`;
      });
    }
    str += `.child.${folder}`;

    delete updatedSubFulder[folder];

    const updatedFulderData = unset(str, folderData.data);

    dispatch(deleteFolder(updatedSubFulder, updatedFulderData));

    setIsOpen(false);
  };

  return (
    <>
      <Icon
      title="Delete"
        onClick={togglePopup}
        className="far fa-times-circle"
      ></Icon>
      <Popup isOpen={isOpen} onClose={togglePopup}>
        <form onSubmit={onSubmit}>
          <div className="popup-body">
            <h4 className="title">Delete `{folder}`</h4>
          </div>
          <div className="popup-action">
            <Button type="button" color="#a6e39a" onClick={togglePopup}>
              Cancel
            </Button>
            <Button color="#eba7b2" type="submit">
              Delete
            </Button>
          </div>
        </form>
      </Popup>
    </>
  );
};

export default DeleteFolder;
