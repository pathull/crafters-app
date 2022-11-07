import PostSchema from '../schemas/post-models';

export const retrieveAllPosts = async () => {
  const allPosts = await PostSchema.findAll();

  return allPosts;
};
