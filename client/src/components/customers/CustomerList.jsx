import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { getCustomers } from "../../data/customersData";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers().then(setCustomers);
  }, []);

  return (
    <div className="container">
      <div className="sub-menu bg-light">
        <h4>Customers</h4>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={`cust-${c.id}`}>
              <th scope="row">{c.id}</th>
              <td>{c.firstName} {c.lastName}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
