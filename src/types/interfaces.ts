export interface IFolder {
  folder: {
    _id: string;
    name: string;
    ancestor: string;
    child: object[];
    designation: string;
  };
}

export interface IParentFolder {
  parentFolder: {
    _id: string;
    name: string;
    ancestor: string;
    child: object[];
    designation: string;
  };
}

export interface IFolderSelector {
    data: [],
    isLoading: boolean,
}
