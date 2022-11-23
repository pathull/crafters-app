export const env = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN as string,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID as string,
  imagePlaceHolder: process.env.PLACEHOLDER_IMAGES as string,
  userImage: process.env.USER_IMAGE,
  urlBase: 'http://localhost:8080',
};
