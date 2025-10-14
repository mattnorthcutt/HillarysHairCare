const _apiUrl = '/api/appointments/upcoming';

export const getUpcomingAppointments = () => {
  return fetch(_apiUrl).then((r) => r.json())
}

export const getAppointment = (id) => {
  return fetch(`/api/appointments/${id}`).then((r) => r.json())
}
