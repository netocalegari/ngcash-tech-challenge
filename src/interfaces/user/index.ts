interface IUser {
  id: string;
  username: string;
  password: string;
  account_id: string;
};

interface IUserRequest {
  username: string;
  password: string;
};

export { IUser, IUserRequest };