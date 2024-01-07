import { insertNode, updatePathTree } from "../../utils/traverseTree";

export const addNewFile = (
  state: any,
  newFolderData: any,
  addLengthToName = false
) => {
  if (addLengthToName) {
    newFolderData.name = `${newFolderData.name} ${
      state.subFolder?.length || 1
    }`;
  }

  const updateFolderTree = insertNode(
    state.data,
    newFolderData.parentId,
    newFolderData
  );

  const updatedSubFolder = state.subFolder;
  updatedSubFolder.push(newFolderData);

  if (newFolderData.parentId !== "root") {
    const newPathTree = updatePathTree(updateFolderTree, state.path);
console.log('first')
    state.pathTree = newPathTree;

    console.log(JSON.stringify(state.pathTree, undefined, 2))
  }

  state.data = updateFolderTree;
  state.subFolder = updatedSubFolder;

  state.activeFolder = { id: newFolderData.id, editable: true };
  state.isLoading = false;

  return state;
};
