import { Button } from "../Styles";
import Popup from "./popup";

// redux stuff
import { useDispatch } from "react-redux";

import { deleteFolder } from "../redux/actions/folderAction";

const DeleteFolder = ({ openConfirmationDialog, setOpenConfirmationDialog, file }) => {

  const dispatch = useDispatch();

  const togglePopup = () => setOpenConfirmationDialog(!openConfirmationDialog);

  const onSubmit = (e: any) => {
    e.preventDefault();

    dispatch(deleteFolder(file.id));
  };

  return (
    <>
      <Popup isOpen={openConfirmationDialog} onClose={togglePopup}>
        <form onSubmit={onSubmit}>
          <div className="popup-body">
            <h4 className="title">Are You Sure?</h4>
            <h5>This will delete permenantly!</h5>
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
