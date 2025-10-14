import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ServiceList from "./components/services/ServiceList.jsx";
import CustomerList from "./components/customers/CustomerList.jsx";
import StylistList from "./components/stylists/StylistList.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="services" element={<ServiceList />} />
        <Route path="customers" element={<CustomerList />} />
        <Route path="stylists" element={<StylistList />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
