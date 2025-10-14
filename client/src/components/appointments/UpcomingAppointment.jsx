import { useEffect, useState } from "react";
import { NavLink, Table } from "reactstrap";
import { cancelAppointment, getUpcomingAppointments } from "../../data/appointmentsData";
import { Link } from "react-router-dom";
export default function UpcomingAppointments() {
  const [appts, setAppts] = useState([]);

  useEffect(() => {
    getUpcomingAppointments().then(setAppts);
  }, []);

  const onCancel = (id) => 
    cancelAppointment(id).then(() => 
      getUpcomingAppointments().then(setAppts)
    )

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
              <td>
              <Link to={`/appointments/${a.id}`}> Details </Link>
              </td>
              <td>
                {!a.isCanceled && (
                  <button className="btn btn-outline-danger btn-sm" onClick={() => onCancel(a.id)}>Cancel</button>
                )}
              </td>
            </tr>
          ))}
          
        </tbody>
      </Table>
    </div>
  );
}
