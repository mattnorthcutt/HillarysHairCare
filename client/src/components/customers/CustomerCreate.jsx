import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../../data/customersData";

export default function CustomerCreate() {
  const nav = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [phone,     setPhone]     = useState("");

  const submit = (e) => {
    e.preventDefault();
    const payload = { firstName, lastName, email, phone };
    createCustomer(payload).then(() => nav("/customers"));
  };

  return (
    <div className="container py-3" style={{ maxWidth: 480 }}>
      <h4>Add Customer</h4>
      <form onSubmit={submit}>
        <input
          className="form-control mb-2"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="form-control mb-3"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="submit">Save</button>
          <button className="btn btn-outline-secondary" type="button" onClick={() => nav(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
