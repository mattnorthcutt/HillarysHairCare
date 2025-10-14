import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ServiceList from "./components/services/ServiceList.jsx";
import CustomerList from "./components/customers/CustomerList.jsx";
import StylistList from "./components/stylists/StylistList.jsx";
import UpcomingAppointments from "./components/appointments/UpcomingAppointment.jsx";
import CustomerCreate from "./components/customers/CustomerCreate.jsx";
import AppointmentDetails from "./components/appointments/AppointmentDetails.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="services" element={<ServiceList />} />
        <Route path="customers" element={<CustomerList />} />
        <Route path="stylists" element={<StylistList />} />
        <Route path="appointments/upcoming" element={<UpcomingAppointments />} />
        <Route path="customers/create" element={<CustomerCreate />} />
        <Route path="appointments/:id" element={<AppointmentDetails />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
