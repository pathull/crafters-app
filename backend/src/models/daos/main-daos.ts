import PostSchema from '../schemas/post-models';
import UserModel from '../schemas/user-schema';

export const retrieveAllPosts = async () => {
  const allPosts = await PostSchema.findAll({
    attributes: { exclude: ['userEmail'] },
    include: {
      model: UserModel,
      attributes: ['id', 'email', 'userPicUrl', 'username'],
    },
  });

  return allPosts;
};
