import { useEffect, useState } from "react";
import { getServices } from "../../data/servicesData";

export default function ServiceList(){
  const [services, setServices] = useState([])

  useEffect(() => {
    getServices().then(setServices)
  }, [])

  return (
    <div className="container">
      <div className="sub-menu bg-light">
        <h4>Services</h4>
      </div>
      <table className="table">
        <thead>
          <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={`service-${s.id}`}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>${Number(s.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
