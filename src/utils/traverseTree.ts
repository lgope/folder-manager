export const insertNodes = (tree, parentId, newFolder) => {
  if (tree.id === parentId) {
    return { ...tree, child: [...tree.child, newFolder] };
  }

  const latestNode = tree?.child?.map((item) => {
    return insertNodes(item, parentId, newFolder);
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

