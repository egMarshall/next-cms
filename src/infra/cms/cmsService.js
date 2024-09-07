export async function cmsService({ query }) {
  try {
    const pageContentResponse = await fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DATO_CMS_READONLY_TOKEN}`,
      },
      body: JSON.stringify({
        query,
      }),
    }).then(async (response) => {
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.errors[0].message);
      }
      return body;
    });

    return {
      data: pageContentResponse.data,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
