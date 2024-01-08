import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { MenuItem } from "@mui/material";

import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { FileType } from "../../types/interfaces";
import { selectFolders } from "../../redux/reducers/folderReducer";
import { useSelector } from "react-redux";
import { findNode } from "../../utils/traverseTree";

import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FolderInfoModal({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileType | {}>({});

  const folderData = useSelector(selectFolders);
  const { path, subFolder, activeFolder } = folderData;

  const handleOpen = () => {
    if (activeFolder?.id) {
      const file = subFolder.filter(
        (f: FileType) => f.id === activeFolder.id
      )[0];

      setSelectedFile(file);
    } else if (path.length) {
      setSelectedFile(findNode(folderData.data, path)[0]);
    } else if (!path.length) {
      setSelectedFile(folderData.data);
    }

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <div>
      <MenuItem onClick={handleOpen} style={{ cursor: "help" }}>
        <ListItemIcon>
          <LightbulbOutlinedIcon fontSize="inherit" />
        </ListItemIcon>
        <ListItemText>
          <Typography fontSize="small">Get Info</Typography>
        </ListItemText>
      </MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedFile && (
            <>
              <div className={`folder-panel files-panel__item folder`}>
                <div className="folder-icon">
                  {selectedFile.isFolder ? (
                    <FolderIcon style={{ color: selectedFile.color }} />
                  ) : (
                    <InsertDriveFileIcon
                      style={{ color: selectedFile.color }}
                    />
                  )}
                </div>
              </div>

              <div className="">
                <p>Name: {selectedFile.name}</p>
              </div>
              <br />

              <div className="">
                {/* {truncateStr(file.name)} */}
                <p>Path: Home/{path.map((p) => `${p.name}/ `)}</p>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
