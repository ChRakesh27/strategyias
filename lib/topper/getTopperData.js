export async function getTopperData({slugs}) {
 
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/getTopperSlug`, {
      method: "POST",
      body: JSON.stringify({ slug: slugs }),
    });
    const data = await res.json(); 
    return data.toppers;
  } catch (err) {
 
    console.log(err);
    return;
  }
}
