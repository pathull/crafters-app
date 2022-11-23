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
  price: string;
  public_image_id: string;
  sold: boolean;
  title: string;
  updatedAt: string;
  userEmail: string;
};
