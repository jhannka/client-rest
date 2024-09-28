export interface IToken {
  token: string;
  userId: number;
}

export interface IUser {
  email: string;
  password: string;
  client_id: string;
  client_secret: string;
}

export interface ILoginData {
  email: string;
  password: string;
}



