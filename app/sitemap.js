export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;
  //get all toppers

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/all-toppers/sitemap.xml`, lastModified: new Date() },
    { url: `${baseUrl}/prelims-notes/sitemap.xml`, lastModified: new Date() },
    { url: `${baseUrl}/article/sitemap.xml`, lastModified: new Date() },
  ];
}
