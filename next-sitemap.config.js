/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.happygreenery.in/",
  generateRobotsTxt: false,
  exclude: [
    "/admin",
    "/my-orders",
    "/privacy-policy",
    "/refund-returns",
    "/shipping-policy",
    "/terms-of-service",
  ],
  // ✅ Explicitly include ONLY shop
  additionalPaths: async (config) => {
    return [
      {
        loc: "/shop",
        changefreq: "daily",
        priority: 1.0,
      },
      {
        loc: "/blog",
        changefreq: "daily",
        priority: 0.9,
      },
    ];
  },
};
