export interface IObjectKeys {
  [key: string]: string | number | boolean | undefined;
}

export interface IObjectKeysStringsOnly {
  [key: string]: string
}

export interface paginatedData {
  page?: number,
  size?: number,
}