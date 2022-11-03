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
  userEmail: string;
  title: string;
  description: string;
  postPicUrl?: string;
  public_image_id?: string;
}
