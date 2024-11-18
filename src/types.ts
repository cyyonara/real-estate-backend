export interface IUser {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface IFilteredUser
  extends Omit<IUser, "password" | "createdAt" | "updatedAt" | "isDeleted"> {}

export interface IResponse<T> {
  data: T;
  message: string;
}

export interface IBadRequestError {
  message: string[];
  error: string;
  statusCode: number;
}
