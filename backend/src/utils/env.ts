export default {
  dbHost: process.env.DB_SQL_HOST,
  dbUserName: process.env.DB_SQL_USERNAME as string,
  dbPort: Number(process.env.DB_SQL_PORT),
  dbPassword: process.env.DB_SQL_PASSWORD as string,
  dbDataBaseName: process.env.DB_SQL_DATABASENAME as string,
  dbDialect: process.env.DB_SQL_DIALECT,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudPublicKey: process.env.CLOUDINARY_PUBLIC_KEY,
  cloudSecretKey: process.env.CLOUDINARY_SECRET_KEY,
  stripeSecretKey: process.env.STRIPE_PRIVATE_KEY as string,
  clientDomain: process.env.CLIENT_DOMAIN as string,
};
