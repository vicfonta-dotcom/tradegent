const nextConfig = {
  experimental: { appDir: true },
  reactStrictMode: true,
  images: { unoptimized: true },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_MODEL: process.env.OPENAI_MODEL,
    DOCKER_API_URL: process.env.DOCKER_API_URL,
    WS_URL: process.env.WS_URL,
    FINNHUB_API_KEY: process.env.FINNHUB_API_KEY,
  },
};

module.exports = nextConfig;
