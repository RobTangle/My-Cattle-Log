export interface IUser {
  id: string;
  name?: string | undefined;
  email: string;
  profile_img?: string;
}

export interface IReqAuth {
  sub: string;
}
