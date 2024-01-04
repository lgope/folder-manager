import React from 'react';

import { MenuItem, Typography } from "@mui/material";
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';

import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';

function CreateFolderAction(props) {
    const {handleClick, handleClose} = props;

    const handleCloseAfter = (callback) => (event) => {
        callback();
        handleClose();
    };

    return (
        <MenuItem onClick={handleCloseAfter(handleClick)}>
            <ViewListOutlinedIcon>
                <CreateNewFolderOutlinedIcon />
            </ViewListOutlinedIcon>
            <Typography variant="inherit">
                Create folder
            </Typography>
        </MenuItem>        
    );
}

export default CreateFolderAction;
