const _apiUrl = '/api/stylists'

export const getStylists = () => {
  return fetch(_apiUrl).then((r) => r.json())
}

export const deactivateStylist = (id) => {
  return fetch(`${_apiUrl}/${id}/deactivate`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  }).then(() => {})
}

export const reactivateStylist = (id) => {
  return fetch(`${_apiUrl}/${id}/reactivate`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  }).then(() => {})
}
