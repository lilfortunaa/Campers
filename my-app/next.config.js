
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ftp.goit.study",
        pathname: "/img/campers-test-task/**",
      },
    ],
  },
  output: "standalone", 
};

export default nextConfig;




