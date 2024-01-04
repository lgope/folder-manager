import {v4 as uuidv4} from 'uuid';

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

export const folderTree = {
  id: uuidv4(),
  name: "root",
  isFolder: true,
  parentId: "",
  child: [
    {
      id: uuidv4(),
      name: "public",
      parentId: "root",
      isFolder: true,
      child: [{ id: uuidv4(), name: "index", isFolder: true, child:[] }],
    },
    {
      id: uuidv4(),
      name: "src",
      parentId: "",
      isFolder: true,
      child: [
        {
          id: uuidv4(),
          name: "components",
          isFolder: true,
          parentId: "",
          child: [
            { id: uuidv4(), name: "images", isFolder: true, child: [
              { id: uuidv4(), name: "ollyo", isFolder: true, child: [] },
              { id: uuidv4(), name: "jakir vai", isFolder: true, child: [] },
              { id: uuidv4(), name: "sajeeb vai", isFolder: true, child: [
                { id: uuidv4(), name: "sifat vai", isFolder: true, child: [] }
              ] }
            ] },
            { id: uuidv4(), name: "Home 1", isFolder: true, child: [] },
            { id: uuidv4(), name: "Login", isFolder: true, child: [] },
          ],
        },
        { id: uuidv4(), name: "App", isFolder: true, child: [] },
        { id: uuidv4(), name: "index", isFolder: true, child: [] },
        { id: uuidv4(), name: "data", isFolder: true, child: [] },
      ],
    },
    {
      id: uuidv4(),
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

/**
 * Calculate available actions for selected files, excluding non coincidences
 * @param {Array<Object>} files
 * @returns {Array<String>}
 */
export const getActionsByMultipleFiles = (files, acts = []) => {
  files.forEach((file) => {
    const fileActs = getActionsByFile(file);
    // intersects previous actions with the following to leave only coincidences
    acts = acts.length
      ? acts.filter((value) => -1 !== fileActs.indexOf(value))
      : fileActs;
  });

  if (files.length > 1) {
    acts.splice(acts.indexOf("open"), acts.indexOf("open") >= 0);
    acts.splice(acts.indexOf("edit"), acts.indexOf("edit") >= 0);
    acts.splice(acts.indexOf("compress"), acts.indexOf("compress") >= 0);
    acts.splice(acts.indexOf("download"), acts.indexOf("download") >= 0);
    acts.splice(acts.indexOf("rename"), acts.indexOf("rename") >= 0);
    acts.push("compress");
  }
  return acts;
};
