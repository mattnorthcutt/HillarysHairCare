const _apiUrl = '/api/customers';

export const getCustomers = () => {
  return fetch(_apiUrl).then((r) => r.json())
}

export const createCustomer = (payload) => {
  return fetch(_apiUrl, {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then((r) => r.json())
}
