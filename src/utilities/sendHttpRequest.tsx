interface HttpRequest {
  method?: string;
  body?: { [key: string]: any };
  headers?: { [key: string]: any };
  signal?: AbortSignal | null;
  url: string;
}

const sendHttpRequest = async ({
  method,
  body,
  headers,
  url,
  signal,
}: HttpRequest) => {
  const init = {
    method: method || 'GET',
    body: body ? JSON.stringify(body) : null,
    headers: headers || {},
    signal,
  };
  const response = await fetch(url, init);
  if (!response.ok) throw await response.json();
  const data = await response.json();
  return data;
};

export default sendHttpRequest;
