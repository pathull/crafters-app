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

export interface IProductItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: string;
}

export interface IItem {
  item: IProductItem;
  userId: number;
}

export interface IOrder {
  id?: number;
  total_price: number;
  total_quantity: number;
  idPost?: number;
  idUser?: number;
}

export interface ILike {
  id?: number;
  like: boolean;
  idUser?: number;
  idPost?: number;
}
