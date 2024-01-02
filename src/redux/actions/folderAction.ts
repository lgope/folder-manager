import {
  getFolderRoot,
  newFolder,
  removeFolder,
} from "../reducers/folderReducer";

import { Dispatch } from "redux";
import { v4 as uuidv4 } from "uuid";

import { folderTreeData } from "../../utils/data";

export const fetchFolderRoot = () => (dispatch: Dispatch) => {
  console.log({ hello: folderTreeData });
  dispatch(getFolderRoot(folderTreeData));
};

export const addFolder = (body) => (dispatch: Dispatch) => {
  const updatedFt = updateFolderTree(folderTreeData, {
    _id: uuidv4(),
    name: body.name,
    ancestor: body.ancestor,
    child: [],
    designation: "folder",
  }, "add");

  dispatch(newFolder(updatedFt));
};

export const deleteFolder = (body) => (dispatch: Dispatch) => {
  // { id: folder._id, ancestor: folder.ancestor }

  const updatedFt = updateFolderTree(folderTreeData, body, "delete");

  dispatch(removeFolder(updatedFt));
};

const updateFolderTree = (ft, newFolder, method="add") => {
  const root = JSON.parse(JSON.stringify(ft));

  const updateRoot = (data) => {
    data.map((ch) => {
      console.log({ ch });

      if (ch._id.toString() === newFolder.ancestor.toString()) {
        ch.child = method === "add" ? [...ch.child, newFolder]: ch.child.filter(
          folder => folder._id.toString() !== newFolder._id.toString()
        );
      } else if (ch.child.length > 0) updateRoot(ch.child);
    });
  };

  updateRoot(root);

  return root;
};

