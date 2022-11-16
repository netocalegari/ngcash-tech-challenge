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

interface ITransactionRequest {
  fromUserId: string;
  toUsername: string;
};

export { IUser, IUserRequest, ITransactionRequest };