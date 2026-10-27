const productionSiteUrl = "https://portfolio-dhruva23.vercel.app";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const isVercelPreview = process.env.VERCEL_ENV === "preview";

export const siteUrl = (
  isVercelPreview ? productionSiteUrl : configuredSiteUrl || productionSiteUrl
).replace(/\/+$/, "");

export const isIndexable = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";
