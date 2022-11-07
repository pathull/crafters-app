import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '../connectionDb';

import { IPost } from '../../types/app-types';

export const PostSchema = sequelize.define<Model<IPost, Optional<IPost, 'id'>>>('posts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  // userEmail: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   validate: {
  //     isEmail: {
  //       msg: 'User must be an Email',
  //     },
  //   },
  // },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  postPicUrl: {
    type: DataTypes.STRING,
  },
  public_image_id: {
    type: DataTypes.STRING,
  },
});

export default PostSchema;
