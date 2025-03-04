/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"], // Add your Django backend domain (or IP if using Docker)
  },
};

export default nextConfig;
