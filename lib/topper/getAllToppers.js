export async function getAllToppers(fields, counts) {
  try {
    let apiUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/api/getTopper`;

    const queryParams = [];
    if (fields) {
      queryParams.push(`fields=${fields}`);
    }
    if (counts) {
      queryParams.push(`count=${counts}`);
    }

    if (queryParams.length > 0) {
      apiUrl += `?${queryParams.join("&")}`;
    }

    const res = await fetch(apiUrl, {
      method: "GET",
    });
    const data = await res.json();
    return data.toppers;
  } catch (err) {
    console.log(err);
    return;
  }
}
