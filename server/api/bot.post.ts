import { FetchError } from "ofetch";

export default defineEventHandler(async (event) => {
  // ... Do whatever you want here
  const config = useRuntimeConfig();
  const { query } = await readBody(event);
  const url = config.private.chatbot.url;
  const secret = config.private.chatbot.secret;
  const postData = { query };
  try {
    const response = await $fetch(url, {
      method: "POST",
      body: postData,
      headers: {
        "Api-Key": secret,
        "Content-Type": "application/json"
      }
      // Nuxt 3's $fetch does not have a direct equivalent for 'rejectUnauthorized: false'
      // If you need to handle self-signed certificates, consider setting it at a global level
      // or using a server proxy to handle the request
    });

    console.log(response);
    return response;
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
