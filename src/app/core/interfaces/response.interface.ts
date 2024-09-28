export interface IResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface IError {
  message: string;
  success: boolean;
}
