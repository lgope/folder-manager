import { Fragment, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined';
import AbcSharpIcon from '@mui/icons-material/AbcSharp';

import Divider from '@mui/material/Divider';


import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NewFolder from "../CreateFolder/NewFolder";

import { useDispatch } from "react-redux";
import { updateSubFolderOnSorting } from "../../redux/actions/folderAction";


const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = ({ handleOnSearch }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [openNewFolderDialog, setOpenNewFolderDialog] = useState(false);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenAddFolderDialog = () => {
    setAnchorEl(null);
    setOpenNewFolderDialog(true);
  };

  const handleAlphabeticallySort = (sortBy: string) => {
    setAnchorEl(null);
    dispatch(updateSubFolderOnSorting(sortBy));
  }

  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Home
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={handleOnSearch}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                color="inherit"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>

              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleOpenAddFolderDialog} disableRipple>
                  <CreateNewFolderOutlinedIcon />
                  Create Folder
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  <NoteAddOutlinedIcon />
                  Create File
                </MenuItem>
                {/* <Divider sx={{ my: 0.5 }} /> */}
                <div className="separator"><FilterAltOutlinedIcon /> Filter</div>
                <MenuItem onClick={() => handleAlphabeticallySort("alphabetically")} disableRipple>
                  <AbcOutlinedIcon />
                  Alphabetically
                </MenuItem>
                {/* <MenuItem onClick={handleClose} disableRipple>
                  <FilterAltOutlinedIcon />
                  More
                </MenuItem> */}
              </StyledMenu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <NewFolder
        openNewFolderDialog={openNewFolderDialog}
        setOpenNewFolderDialog={setOpenNewFolderDialog}
      />
    </Fragment>
  );
};

export default Navbar;
