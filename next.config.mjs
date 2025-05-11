/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    DATABASE_URL: "mongodb+srv://GameSpaceDev:GameSpaceDev1234@gamespacecluster.79wzx7g.mongodb.net/GameSpaceDB",
    JWT_SECRET: "kZh/Qke/9Obj+bvhlr3wyzxIkCRNdIqe887xOkS0FFA=",
    JWT_EXPIRES_IN: "1h"
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
};

export default nextConfig;
