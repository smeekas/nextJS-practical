/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGO_URI:
      "mongodb+srv://admin:ukWJehCCQpnTIinv@cluster0.jdmz6ye.mongodb.net/practical?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
