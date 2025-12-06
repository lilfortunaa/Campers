
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ftp.goit.study",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    appDir: true,
  },
  output: "standalone", 
};

export default nextConfig;



