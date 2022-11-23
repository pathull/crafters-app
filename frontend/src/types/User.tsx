export type user = {
  auction_wins: number;
  bio: string;
  createdAt: string;
  email: string;
  id: number;
  name: string;
  public_picture_id: string;
  updatedAt: string;
  userPicUrl: string;
  username: string;
};

export type User = {
  email?: string | undefined;
  email_verified?: boolean | undefined;
  name: string;
  nickname: string;
  picture: string;
  sub?: string | undefined;
  updated_at?: string | undefined;
};
