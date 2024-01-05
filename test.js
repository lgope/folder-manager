import { v4 as uuidv4 } from "uuid";

export const folderTree = {
  id: "root",
  name: "root",
  isFolder: true,
  parentId: "",
  child: [
    {
      id: 1.1,
      name: "public",
      parentId: "root",
      isFolder: true,
      child: [
        {
          id: 545454,
          name: "index",
          parentId: 1.1,
          isFolder: true,
          child: [],
        },
      ],
    },
    {
      id: 2,
      name: "src",
      parentId: "root",
      isFolder: true,
      child: [
        {
          id: 3,
          name: "components",
          isFolder: true,
          parentId: 2.1,
          child: [
            {
              id: 4,
              name: "images",
              parentId: 3,
              isFolder: true,
              child: [
                {
                  id: 22222,
                  name: "ollyo",
                  isFolder: true,
                  parentId: 4,
                  child: [],
                },
                {
                  id: 33333,
                  name: "jakir vai",
                  isFolder: true,
                  parentId: 4,
                  child: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: uuidv4(),
      parentId: "root",
      name: "package.json",
      isFolder: false,
    },
    {
      id: uuidv4(),
      parentId: "root",
      name: "b",
      isFolder: true,
    },
    {
      id: uuidv4(),
      parentId: "root",
      name: "d",
      isFolder: true,
    },
    {
      id: uuidv4(),
      parentId: "root",
      name: "c",
      isFolder: true,
    },
    {
      id: uuidv4(),
      parentId: "root",
      name: "a",
      isFolder: true,
    },
  ],
};

const updatePathTree = (tree, pathArr = []) => {
  let folderTree = tree.child;

  const pathTree = pathArr.reduce((acc, curr) => {
    folderTree = folderTree[curr.index].child;

    acc.push(folderTree);

    return acc;
  }, []);

  return pathTree;
};

const path = [
  { id: 2, name: "src", index: 1 },
  { id: 3, name: "components", index: 0 },
  { id: 4, name: "images", index: 0 },
];

console.log(updatePathTree(folderTree, path));
