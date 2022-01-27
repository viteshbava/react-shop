import ReactError from "./reactError";

const sendHttpRequest = async (config) => {
  const init = {
    method: config.method ? config.method : "GET",
    body: config.body ? JSON.stringify(config.body) : null,
    headers: config.headers ? config.headers : {},
  };
  try {
    const response = await fetch(config.url, init);
    if (!response.ok) {
      throw new ReactError({
        message: `Request failed to: ${config.url}`,
        statusCode: 400,
      });
    }
    const data = await response.json();
    if (!data)
      throw new ReactError({
        message: `No data returned from: ${config.url}`,
        statusCode: 404,
      });
    return data;
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    if (!err.message) err.message = "Something went wrong!";
    throw err;
  }
};

export default sendHttpRequest;
