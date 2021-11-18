export interface IDeleteFileResponse {
  isFileDeleted: boolean;
  fileFound?: boolean;
  dbDeleteResponse: {
    n: number;
    ok: number;
    deletedCount: number;
  };
}
