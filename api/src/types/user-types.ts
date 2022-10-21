export interface IUser {
  id: string;
  name?: string | undefined;
  email: string;
}

export interface IReqAuth {
  sub: string;
}
