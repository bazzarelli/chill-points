/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  // sw: "service-worker.js",
});

module.exports = withPWA({
  // nextJs config
});
