export type JwtPayload = {
  sub: string;
  iat: number;
  exp: number;
};

export type UserMetaData = {
  _id: string;
  name: string;
  email: string;
  role: string;
  teamNumber?: string;
};

export type RequestWithUser = Request & { user: UserMetaData };
