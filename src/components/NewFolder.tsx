import React, { useState } from "react";
import Popup from "./popup";
import { Icon, Input, Button } from "../Styles";

// redux stuff
import { useDispatch } from "react-redux";
import { addFolder } from "../redux/actions/folderAction";

// types
import { IParentFolder } from "../types/interfaces";

const NewFolder = ({ parentFolder }: IParentFolder) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const togglePopup = (e: any) => setIsOpen(!isOpen);

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    console.log({ name });

    dispatch(addFolder({ name, ancestor: parentFolder._id }));

    setIsOpen(false);
  };
  return (
    <>
      <Icon
        onClick={togglePopup}
        title="Add New Folder"
        className="fas fa-plus-circle"
      ></Icon>
      <Popup isOpen={isOpen} onClose={togglePopup}>
        <form onSubmit={onSubmit}>
          <div className="popup-body">
            <h4 className="title">Add Folder in `{parentFolder.name}`</h4>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="popup-action">
            <Button type="button" color="#eba7b2" onClick={togglePopup}>
              Cancel
            </Button>
            <Button color="#a6e39a" type="submit">
              Add
            </Button>
          </div>
        </form>
      </Popup>
    </>
  );
};

export default NewFolder;
