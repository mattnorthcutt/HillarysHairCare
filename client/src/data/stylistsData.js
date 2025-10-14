const _apiUrl = '/api/customers'

export const getStylists = () => {
  return fetch(_apiUrl).then((r) => r.json())
}
