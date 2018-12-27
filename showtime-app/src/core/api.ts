export const createShow = () => {
  return fetch(
    'http://localhost:5000/api/shows',
    {
      method: 'POST'
    }
  ).then(response => {
    if (!response.ok) throw Error();
    return response;
  }).then(response => response.json());
}