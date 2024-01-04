import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { v4 as uuidv4 } from "uuid";

import { selectFolders } from "../../redux/reducers/folderReducer";
import { useDispatch, useSelector } from "react-redux";
import { addFolder } from "../../redux/actions/folderAction";

export default function FormDialog({
  openNewFolderDialog,
  setOpenNewFolderDialog,
}) {
  const [name, setName] = React.useState("");

  const folderData = useSelector(selectFolders);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenNewFolderDialog(false);
  };

  const handleAddNewFile = (event) => {
    event.stopPropagation();

    if (name) {
      const parentFolderId = folderData.path[folderData.path.length - 1].id;

      const newFolder = {
        id: uuidv4(),
        name,
        isFolder: true,
        parentId: parentFolderId,
        child: [],
      };

      dispatch(addFolder(newFolder));
      setOpenNewFolderDialog(false);
      setName("");
    }
  };

  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  return (
    <React.Fragment>
      <Dialog open={openNewFolderDialog} onClose={handleClose}>
        <DialogContent>
          {/* <DialogContentText>
            Name
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewFile}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
