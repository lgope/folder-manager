import { v4 as uuidv4 } from "uuid";

/**
 * Main Data
 * allFolder: []
 * subFolder: []
 *
 * path : [{id: parentId, name: folderName}]
 * pathTree : [[file.child],......]
 *
 */

const folderTreeDemoData = {
  id: 1,
  name: "root",
  isFolder: true,
  parentId: "",
  color: "#45caf1",
  child: [
    {
      id: 1.1,
      name: "public",
      parentId: 1,
      isFolder: true,
      child: [
        {
          id: 1.121212,
          name: "index",
          isFolder: true,
          child: [
            {
              id: 2,
              name: "public",
              parentId: 1.1,
              isFolder: true,
              child: [{ id: 2.1, name: "index", isFolder: true, child: [] }],
            },
          ],
        },
      ],
    },
  ],
};

export const folderTree = {
  id: "root",
  name: "root",
  isFolder: true,
  parentId: "",
  color: "#45caf1",
  child: [
    {
      id: 1.1,
      name: "public",
      parentId: "root",
      isFolder: true,
      color: "#45caf1",
      child: [
        {
          id: 545454,
          name: "index",
          parentId: 1.1,
          isFolder: true,
          color: "#45caf1",
          child: [],
        },
      ],
    },
    {
      id: 2,
      name: "src",
      parentId: "root",
      isFolder: true,
      color: "#45caf1",
      child: [
        {
          id: 3,
          name: "components",
          isFolder: true,
          parentId: 2.1,
          color: "#45caf1",
          child: [
            {
              id: 4,
              name: "images",
              parentId: 3,
              isFolder: true,
              color: "#45caf1",
              child: [
                {
                  id: 22222,
                  name: "ollyo",
                  isFolder: true,
                  parentId: 4,
                  color: "#45caf1",
                  child: [],
                },
                {
                  id: 33333,
                  name: "jakir vai",
                  isFolder: true,
                  parentId: 4,
                  color: "#45caf1",
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
      color: "#cad444",
      isFolder: false,
    },
    {
      id: uuidv4(),
      parentId: "root",
      name: "Bangladesh",
      color: "#45caf1",
      isFolder: true,
      child: [],
    },
    {
      id: uuidv4(),
      parentId: "root",
      name: "Dubai",
      color: "#45caf1",
      isFolder: true,
      child: [],
    },
    {
      id: uuidv4(),
      parentId: "root",
      name: "Canada",
      color: "#45caf1",
      isFolder: true,
      child: [],
    },
    {
      id: uuidv4(),
      parentId: "root",
      name: "America",
      color: "#45caf1",
      isFolder: true,
      child: [],
    },
  ],
};

// const objDataStructure = {
//   a: {
//     id: 'a',
//     parentId: '',
//     child: ['c']
//   },

//   b: {
//     id: 'b',
//     parentId: '',
//     child: []
//   },

//   c: {
//     id: 'c',
//     parentId: 'a',
//     child: []
//   },
// }

/**
 * Calculate file size by bytes in human readable format
 * @param {Number} bytes
 * @returns {String}
 */
export const getHumanFileSize = (bytes: number): string => {
  const e = (Math.log(bytes) / Math.log(1e3)) | 0;
  return (
    +(bytes / Math.pow(1e3, e)).toFixed(2) +
    " " +
    ("kMGTPEZY"[e - 1] || "") +
    "B"
  );
};

export const debounce = <T extends (...args: any[]) => ReturnType<T>>(
  callback: T,
  timeout: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};

export const truncateStr = (str: string, n = 22) =>
  str.length > n ? str.substring(0, n) + "...." : str;

export const isNameExits = (folderArr: [] = [], name: string) =>
  folderArr.some((folder) => folder.name === name);
