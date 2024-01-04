import { v4 as uuidv4 } from "uuid";

export const folderTreeData = [
  {
    _id: "60a8e2e1c03d13356cfb12b0",
    child: [
      {
        _id: "60ae3893e9272900150cacd4",
        name: "src",
        ancestor: "60a8e2e1c03d13356cfb12b0",
        child: [
          {
            _id: "60ae39e2e9272900150cacd5",
            name: "assets",
            ancestor: "60ae3893e9272900150cacd4",
            child: [],
            designation: "folder",
          },
        ],
        designation: "folder",
      },
      {
        _id: "60ae39ebe9272900150cacd6",
        name: "component",
        ancestor: "60a8e2e1c03d13356cfb12b0",
        child: [],
        designation: "folder",
      },
      {
        _id: "6135bd80b048740015d48ff4",
        name: "utils",
        ancestor: "60a8e2e1c03d13356cfb12b0",
        child: [],
        designation: "folder",
      },
    ],
    designation: "root",
    name: "Root",
    __v: { $numberInt: "0" },
  },
];

export const folderData = {
  src: {
    name: "src",
    type: "folder",
    child: {
      assets: {
        name: "assets",
        type: "folder",
        child: {
          images: {
            name: "images",
            type: "folder",
            child: {},
          },
        },
      },
      public: {
        name: "public",
        type: "folder",
        child: {},
      },
    },
  },
  pages: {
    name: "pages",
    type: "folder",
    child: {},
  },

  component: {
    name: "component",
    type: "folder",
    child: {},
  },
  utils: {
    name: "utils",
    type: "folder",
    child: {},
  },
};

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
  id: 1,
  name: "root",
  isFolder: true,
  parentId: "",
  child: [
    {
      id: 1.1,
      name: "public",
      parentId: 1,
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
      parentId: 1,
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
      parentId: 1,
      name: "package.json",
      isFolder: false,
    },
  ],
};

export const deletePropertyPath = (obj, path) => {
  if (!obj || !path) {
    return;
  }

  if (typeof path === "string") {
    path = path.split(".");
  }

  for (var i = 0; i < path.length - 1; i++) {
    obj = obj[path[i]];

    if (typeof obj === "undefined") {
      return;
    }
  }

  delete obj[path.pop()];

  return obj;
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
export const getHumanFileSize = (bytes) => {
  const e = (Math.log(bytes) / Math.log(1e3)) | 0;
  return (
    +(bytes / Math.pow(1e3, e)).toFixed(2) +
    " " +
    ("kMGTPEZY"[e - 1] || "") +
    "B"
  );
};
