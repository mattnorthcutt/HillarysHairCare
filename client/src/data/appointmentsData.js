const _apiUrl = '/api/appointments/upcoming';

export const getUpcomingAppointments = () => {
  return fetch(_apiUrl).then((r) => r.json())
}
