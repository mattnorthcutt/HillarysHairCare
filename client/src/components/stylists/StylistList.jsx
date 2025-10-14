import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { getStylists } from "../../data/stylistsData";

export default function StylistList() {
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    getStylists().then(setStylists);
  }, []);

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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
