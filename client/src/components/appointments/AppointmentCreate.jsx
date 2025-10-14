import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAppointment } from "../../data/appointmentsData";
import { getCustomers } from "../../data/customersData";
import { getStylists } from "../../data/stylistsData";
import { getServices } from "../../data/servicesData";

export default function AppointmentCreate() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [services, setServices] = useState([]);
  const [customerId, setCustomerId] = useState(0);
  const [stylistId, setStylistId] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [serviceIds, setServiceIds] = useState([]);

  useEffect(() => {
    getCustomers().then(setCustomers);
    getStylists().then(setStylists);
    getServices().then(setServices);
  }, []);

  const toggleService = (id) => {
    setServiceIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const submit = (e) => {
    e.preventDefault();

    const payload = {
      customerId: Number(customerId),
      stylistId: Number(stylistId),
      startTime, 
      serviceIds,
    };

    createAppointment(payload).then((created) => {
      navigate(`/appointments/${created.id}`);
    });
  };

  return (
    <div className="container py-3" style={{ maxWidth: 520 }}>
      <h4>Schedule Appointment</h4>
      <form onSubmit={submit}>
        <label className="form-label mt-2">Customer</label>
        <select
          className="form-select"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        >
          <option value="0">Choose a customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.firstName} {c.lastName}
            </option>
          ))}
        </select>

        <label className="form-label mt-3">Stylist</label>
        <select
          className="form-select"
          value={stylistId}
          onChange={(e) => setStylistId(e.target.value)}
        >
          <option value="0">Choose a stylist</option>
          {stylists.map((s) => (
            <option key={s.id} value={s.id}>
              {s.firstName} {s.lastName}
            </option>
          ))}
        </select>

        <label className="form-label mt-3">Start Time</label>
        <input
          type="datetime-local"
          className="form-control"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label className="form-label mt-3">Services</label>
        <div className="d-flex flex-column gap-1">
          {services.map((s) => (
            <label key={s.id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={serviceIds.includes(s.id)}
                onChange={() => toggleService(s.id)}
              />
              <span className="form-check-label">
                {s.name} (${Number(s.price).toFixed(2)})
              </span>
            </label>
          ))}
        </div>

        <div className="mt-3 d-flex gap-2">
          <button className="btn btn-primary" type="submit">Create</button>
          <button className="btn btn-outline-secondary" type="button" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
