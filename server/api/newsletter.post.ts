import { FetchError } from "ofetch";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email } = body;
  // Check if email is provided
  if (!email) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
  try {
    // Extracting the email from the query parameters

    const url = new URL("https://go.correctiv.org/l/992892/2023-10-26/4243ct");
    url.searchParams.append("email", email);

    const response = await fetch(url.toString(), {
      method: "POST"
    });

    return response.body;
  } catch (err) {
    if (err instanceof FetchError) {
      throw createError({
        statusCode: err.statusCode,
        statusMessage: err.message,
        status: err.status,
        statusText: err.statusText
      });
    } else {
      console.log(err);
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error"
      });
    }
  }
});
