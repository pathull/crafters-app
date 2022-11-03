import { DataTypes } from 'sequelize';
import { sequelize } from '../connectionDb';

export const PostSchema = sequelize.define('posts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'User must be an Email',
      },
    },
  },
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
  public_id: {
    type: DataTypes.STRING,
  },
});
