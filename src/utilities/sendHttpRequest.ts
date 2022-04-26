interface HttpRequest<BodyType, HeaderType> {
  method?: string;
  body?: BodyType;
  headers?: HeaderType;
  signal?: AbortSignal | null;
  url: string;
}

const sendHttpRequest = async <B, H>({
  method,
  body,
  headers,
  url,
  signal,
}: HttpRequest<B, H>) => {
  const init = {
    method: method || 'GET',
    body: body ? JSON.stringify(body) : null,
    headers: headers || {},
    signal,
  };
  console.log(url);
  const response = await fetch(url, init);
  if (!response.ok) throw await response.json();
  const data = await response.json();
  return data;
};

export default sendHttpRequest;
