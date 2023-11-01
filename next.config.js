/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  mode: "production",
});

module.exports = withPWA({
  // nextJs config
  strict: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
  },
});
