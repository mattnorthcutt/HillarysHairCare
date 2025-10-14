import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { getUpcomingAppointments } from "../../data/appointmentsData";
export default function UpcomingAppointments() {
  const [appts, setAppts] = useState([]);

  useEffect(() => {
    getUpcomingAppointments().then(setAppts);
  }, []);

  const dateTimeFormat = (dt) => new Date(dt).toLocaleString();

  return (
    <div className="container">
      <div className="sub-menu bg-light">
        <h4>Upcoming Appointments</h4>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Start</th>
            <th>Customer</th>
            <th>Stylist</th>
          </tr>
        </thead>
        <tbody>
          {appts.map((a) => (
            <tr key={`appt-${a.id}`}>
              <th scope="row">{a.id}</th>
              <td>{dateTimeFormat(a.startTime)}</td>
              <td>{a.customer?.firstName} {a.customer?.lastName}</td>
              <td>{a.stylist?.firstName} {a.stylist?.lastName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
