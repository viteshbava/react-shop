const sendHttpRequest = async ({ method, body, headers, url, signal }) => {
  const init = {
    method: method ? method : "GET",
    body: body ? JSON.stringify(body) : null,
    headers: headers ? headers : {},
    signal: signal ? signal : null,
  };
  try {
    const response = await fetch(url, init);
    if (!response.ok) throw await response.json();
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default sendHttpRequest;
