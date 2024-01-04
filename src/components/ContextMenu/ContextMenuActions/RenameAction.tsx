import { MenuItem, Typography } from "@mui/material";
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';

import WrapTextIcon from '@mui/icons-material/WrapText';

// import { setVisibleDialogRename } from '../../../Actions/Actions.js';

function MoveAction(props) {
    const {handleClick, selectedFiles} = props;

    return (
        <MenuItem onClick={(e) => handleClick(e, selectedFiles)}>
            <ViewListOutlinedIcon>
                <WrapTextIcon />
            </ViewListOutlinedIcon>
            <Typography variant="inherit">
                Rename
            </Typography>
        </MenuItem>        
    );
}

export default MoveAction;
