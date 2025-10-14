import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAppointment } from "../../data/appointmentsData";

export default function AppointmentDetails() {
  const { id } = useParams();
  const [appt, setAppt] = useState(null);

  useEffect(() => {
    getAppointment(id).then(setAppt);
  }, [id]);

  if (!appt) return null;

  const fmt = (n) => `$${Number(n || 0).toFixed(2)}`;

  return (
    <div className="container">
      <div className="sub-menu bg-light">
        <h4>Appointment #{appt.id}</h4>
        <Link to="/appointments/upcoming">Back</Link>
      </div>

      <table className="table">
        <tbody>
          <tr>
            <th>Start Time</th>
            <td>{new Date(appt.startTime).toLocaleString()}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{appt.isCanceled ? "Canceled" : "Scheduled"}</td>
          </tr>
          <tr>
            <th>Customer</th>
            <td>{appt.customer?.firstName} {appt.customer?.lastName}</td>
          </tr>
          <tr>
            <th>Stylist</th>
            <td>{appt.stylist?.firstName} {appt.stylist?.lastName}</td>
          </tr>
        </tbody>
      </table>

      <h6>Services</h6>
      <table className="table">
        <thead>
          <tr><th>Id</th><th>Name</th><th className="text-end">Price</th></tr>
        </thead>
        <tbody>
          {appt.services?.map((s) => (
            <tr key={`svc-${s.id}`}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td className="text-end">{fmt(s.price)}</td>
            </tr>
          ))}
          <tr>
            <th colSpan={2} className="text-end">Total</th>
            <th className="text-end">{fmt(appt.total)}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
