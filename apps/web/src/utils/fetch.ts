export const fetchJson = async<T> (
  method: string,
  path: string,
  body?: any
): Promise<T>  => {
  const request = await fetch(`${path}`, {
    method: method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  const data = await request.json();
  return data as T;
};
