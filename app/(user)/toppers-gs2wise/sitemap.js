export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;
    //get all toppers
  
    return [{ url: `${baseUrl}/toppers-gs2wise`, lastModified: new Date() }];
  }
  