import { FileType, IdType, PathType } from "../types/interfaces";

export const insertNode = (tree: FileType, parentId:IdType, newFolder: FileType): {} => {
  if (tree.id === parentId) {
    return { ...tree, child: [...tree.child, newFolder] };
  }

  const latestNode = tree?.child?.map((item) => {
    return insertNode(item, parentId, newFolder);
  });

  return { ...tree, child: latestNode };
};

export const editNode = (tree:FileType, id:IdType, value: string): {} => {
  if (tree.id === id) {
    tree.name = value;
    return tree;
  }
  tree?.child?.map((item) => editNode(item, id, value));
  return { ...tree };
};

export const deleteNode = (tree: FileType, id: IdType) => {
  for (let i = 0; i < tree?.child?.length; i++) {
    const item: FileType = tree.child[i];
    if (item.id === id) {
      tree.child.splice(i, 1);
      return tree;
    } else {
      deleteNode(item, id);
    }
  }
  return tree;
};

export const updateNodeOnSort = (tree: any, parentId: IdType, child: []) => {
  if (tree.id === parentId) {
    return { ...tree, child: [...child] };
  }

  const latestNode = tree?.child?.map((item: any) => {
    return updateNodeOnSort(item, parentId, child);
  });

  return { ...tree, child: latestNode };
};

export const updatePathTree = (tree: any, pathArr: PathType[] = []) => {
  let folderTree = tree.child;

  const pathTree = pathArr.reduce((acc: any, curr) => {
    folderTree = folderTree[curr.index].child;

    acc.push(folderTree);

    return acc;
  }, []);

  return pathTree;
};

export const updateNodeColor = (
  tree: any,
  id: IdType,
  color: string
) => {
  if (tree.id === id) {
    return { ...tree, color };
  }

  const latestNode = tree?.child?.map((item: FileType) => {
    return updateNodeColor(item, id, color);
  });

  return { ...tree, child: latestNode };
};

export const updateSubFolderTree = (tree: any, pathArr: PathType[]) => {
  let folderTree = tree.child;

  if (!pathArr.length) return folderTree;

  const pathTree = pathArr.reduce((acc, curr) => {
    folderTree = folderTree[curr.index].child;

    acc = folderTree;
    return acc;
  }, []);

  return pathTree;
};

// update child parent id on paste
export const updateChildParentId = (childArr: [], newId: IdType) => {
  const latestNode = childArr.map((item: FileType) => {
    const updtedItem = {...item};
    updtedItem.parentId = newId;

    return updtedItem;
  });

  return latestNode;
};

export const findNode = (tree: any, pathArr: PathType[]) => {
  let folderTree = tree.child;

  if (!pathArr.length) return folderTree;

  const item = pathArr.reduce((acc, curr: PathType) => {
    acc = folderTree;
    folderTree = folderTree[curr.index].child;

    return acc;
  }, {});

  return item;
};
