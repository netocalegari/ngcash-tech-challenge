interface IUser {
  id: string;
  username: string;
  password: string;
  account_id: string;
}

interface IUserRequest {
  username: string;
  password: string;
}

interface ITransactionRequest {
  fromUserId: string;
  username: string;
  amount: number;
}

export { IUser, IUserRequest, ITransactionRequest };
