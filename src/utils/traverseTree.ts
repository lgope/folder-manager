export const insertNode = (tree, parentId, newFolder) => {
  if (tree.id === parentId) {
    return { ...tree, child: [...tree.child, newFolder] };
  }

  const latestNode = tree?.child?.map((item) => {
    return insertNode(item, parentId, newFolder);
  });

  return { ...tree, child: latestNode };
};

export const editNode = (tree, id, value) => {
  if (tree.id === id) {
    tree.name = value;
    return tree;
  }
  tree?.child?.map((item) => editNode(item, id, value));
  return { ...tree };
};

export const deleteNode = (tree, id) => {
  for (let i = 0; i < tree?.child?.length; i++) {
    const item = tree.child[i];
    if (item.id === id) {
      tree.child.splice(i, 1);
      return tree;
    } else {
      deleteNode(item, id);
    }
  }
  return tree;
};

export const updateNodeOnSort = (tree, parentId, child) => {
  if (tree.id === parentId) {
    return { ...tree, child: [...child] };
  }

  const latestNode = tree?.child?.map((item) => {
    return updateNodeOnSort(item, parentId, child);
  });

  return { ...tree, child: latestNode };
};

export const updatePathTree = (tree, pathArr = []) => {
  let folderTree = tree.child;

  const pathTree = pathArr.reduce((acc, curr) => {
    folderTree = folderTree[curr.index].child;

    acc.push(folderTree);

    return acc;
  }, []);

  return pathTree;
};

export const updateNodeColor = (tree, id, color) => {
  if (tree.id === id) {
    return { ...tree, color };
  }

  const latestNode = tree?.child?.map((item) => {
    return updateNodeColor(item, id, color);
  });

  return { ...tree, child: latestNode };
};

export const updateSubFolderTree = (tree, pathArr) => {
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
export const updateChildParentId = (childArr, newId) => {
  const latestNode = childArr.map((item) => {
    item.parentId = newId;

    return item;
  });

  return latestNode;
}