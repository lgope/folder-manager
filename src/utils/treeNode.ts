// const treeNode = () => {
   export const insertNodes = (tree, parentId, newFolder) => {
      if (tree.id === parentId) {
        return { ...tree, child: [...tree.child, newFolder] };
      }
      const latestNode = tree?.child?.map((item) => {
        console.log("recursive call inside insert Node");
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
      console.log(tree, "first");
      for (let i = 0; i < tree?.child?.length; i++) {
        const item = tree.child[i];
        if (item.id === id) {
          console.log(tree, "before splice");
          tree.child.splice(i, 1);
          console.log(tree, "after splice");
          return tree;
        } else {
          console.log(tree, "recursive call inside delete Node");
          deleteNode(item, id);
        }
      }
      return tree;
    };
  
//     return { insertNodes, editNode, deleteNode };
//   };
  

//   export default treeNode;