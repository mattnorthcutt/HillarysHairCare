import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { deactivateStylist, getStylists, reactivateStylist } from "../../data/stylistsData";

export default function StylistList() {
  const [stylists, setStylists] = useState([]);

  const easy = () => getStylists().then(setStylists)

  useEffect(() => {
    easy()
  }, []);

  const toggleActive = (s) => {
    const click = s.isActive ? deactivateStylist : reactivateStylist;
    click(s.id).then(easy)
  }

  return (
    <div className="container">
      <div className="sub-menu bg-light">
        <h4>Stylists</h4>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {stylists.map((s) => (
            <tr key={`stylist-${s.id}`}>
              <th scope="row">{s.id}</th>
              <td>{s.firstName} {s.lastName}</td>
              <td>{s.isActive ? "Active" : "Inactive"}</td>
              <td>
                <button className={`btn btn-sm ${s.isActive ? "btn-warning" : "btn-success"}`}
                onClick={() => toggleActive(s)}>
                  {s.isActive ? "Deactivate" : "Reactivate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
