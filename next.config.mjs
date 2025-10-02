/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: '/fin-customer', // Uncomment and set your base path for VM deployment
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
