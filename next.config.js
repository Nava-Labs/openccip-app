/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = nextConfig;
