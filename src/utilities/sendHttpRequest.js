import ReactError from "./reactError";

const sendHttpRequest = async ({ method, body, headers, url }) => {
  const init = {
    method: method ? method : "GET",
    body: body ? JSON.stringify(body) : null,
    headers: headers ? headers : {},
  };
  try {
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new ReactError({
        message: `Request failed to: ${url}`,
        statusCode: 400,
      });
    }
    const data = await response.json();
    if (!data)
      throw new ReactError({
        message: `No data returned from: ${url}`,
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
