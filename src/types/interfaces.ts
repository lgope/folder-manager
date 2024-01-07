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
  data: [];
  isLoading: boolean;
}

export type FileType = {
  id: string | number;
  name: string | number;
  isFolder: boolean;
  parentId: string | number;
  color: string;
  child: [];
};

export interface IState {
  data: FileType;
  subFolder: [];
  path: [];
  pathTree: [];
  isLoading: boolean;
  stagedFile: { stageType: 'copy' | 'cut'; file: FileType };
  activeFolder: { id: string | number; editable: boolean };
}
