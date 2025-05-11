/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DATABASE_URL: "mongodb+srv://GameSpaceDev:GameSpaceDev1234@gamespacecluster.79wzx7g.mongodb.net/?retryWrites=true&w=majority&appName=GameSpaceCluster",
    JWT_SECRET: "kZh/Qke/9Obj+bvhlr3wyzxIkCRNdIqe887xOkS0FFA=",
    JWT_EXPIRES_IN: "1h"
  }
};

export default nextConfig;
