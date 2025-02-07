/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://chillpoints.app",
  generateRobotsTxt: false, // Set to false since you're managing robots.txt manually
  outDir: "public",
  // Optional configurations:
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/admin/*", "/private/*"], // Add any paths you want to exclude
};
