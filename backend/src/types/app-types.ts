export interface IFileImage {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface IPost {
  id?: number;
  userEmail?: string;
  title: string;
  description: string;
  postPicUrl?: string;
  public_image_id?: string;
  price?: number;
  sold?: boolean;
}

export interface IUser {
  id?: number;
  email: string;
  userPicUrl?: string;
  public_picture_id?: string;
  username?: string;
  name?: string;
  bio?: string;
  auction_wins?: number;
}

export interface IComment {
  id?: number;
  comment: string;
  idUser?: number;
  idPost?: number;
}

export interface IWishList {
  id?: number;
  wishlist?: boolean;
  idUser?: number;
  idPost?: number;
  post?: IPost;
}
