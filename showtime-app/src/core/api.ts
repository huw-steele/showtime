export const createShow = () => {
  return fetch(
    'http://94.173.180.77:89/api/shows',
    {
      method: 'POST'
    }
  ).then(response => {
    if (!response.ok) throw Error();
    return response;
  }).then(response => response.json());
}