import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '../connectionDb';

import { IUser } from '../../types/app-types';

const UserSchema = sequelize.define<Model<IUser, Optional<IUser, 'id'>>>('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Enter a valid Email',
      },
    },
  },
  userPicUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  public_picture_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  auction_wins: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default UserSchema;
