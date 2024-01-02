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
