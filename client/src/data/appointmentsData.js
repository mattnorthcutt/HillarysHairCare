const _apiUrl = '/api/appointments/upcoming';

export const getUpcomingAppointments = () => {
  return fetch(_apiUrl).then((r) => r.json())
}

export const getAppointment = (id) => {
  return fetch(`/api/appointments/${id}`).then((r) => r.json())
}

export const cancelAppointment = (id) => {
  return fetch(`/api/appointments/${id}/cancel`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  }).then (() => {})
}

export const createAppointment = (payload) => {
  return fetch(`/api/appointments`, {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then((r) => r.json())
}
