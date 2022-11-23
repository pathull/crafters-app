import { user } from './User';

export type postData = {
  createdAt?: string;
  id?: number;
  idPost?: number;
  idUser?: number;
  updatedAt?: string;
  wishlist: boolean;
};

export type postDetails = {
  createdAt: string;
  description: string;
  id: number;
  postPicUrl: string;
  price: number;
  public_image_id: string;
  sold: boolean;
  title: string;
  updatedAt: string;
  userEmail: string;

  postPicture?: Blob;
  user: user;
  idPost:number;
  comment:string;
};

export type newPost = {
  postPicture: any;
  title: string;
  description: string;
  price: number;
  userEmail: string | undefined;
};

export const defaultPost = {
  createdAt: '',
  description: '',
  id: 0,
  postPicUrl: '',
  price: 0,
  public_image_id: '',
  sold: false,
  title: '',
  updatedAt: '',
  userEmail: '',
  username: '',
  user: {
    id: 0,
  },
  idPost:0,
  comment:'',
};

//confirm this data shape
export type comment = {
  description: string;
  comment: string;
  updatedAt: string;
  id: number;
  idPost: number;
  user: user;
};

export type likeStatus = {
  like: boolean;
  id?: number;
};