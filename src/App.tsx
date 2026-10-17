import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Welcome from "./pages/Welcome";
import ManagerLogin from "./pages/ManagerLogin";
import SellerLogin from "./pages/SellerLogin";
import ManagerLayout from "./ManagerLayout/ManagerLayout";
import Events from "./pages/Manager/Events";
import Sellers from "./pages/Manager/Sellers";
import Reports from "./pages/Manager/Reports";
import SellerLayout from "./SellerLayout/SellerLayout";
import AssignedEvents from "./pages/Seller/AssignedEvents";
import CreateEvent from "./pages/Manager/CreateEvent";
import Mysales from "./pages/Seller/Mysales";
import SellTicket from "./pages/Seller/SellTicket";
import SellTable from "./pages/Seller/SellTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route path="/manager/login" element={<ManagerLogin />} />

        <Route path="/seller/login" element={<SellerLogin />} />

        <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<Events />}></Route>
          <Route path="create" element={<CreateEvent />}></Route>
          <Route path="sellers" element={<Sellers />}></Route>
          <Route path="reports" element={<Reports />}></Route>
        </Route>

        <Route path="/seller" element={<SellerLayout />}>
          <Route index element={<AssignedEvents />}></Route>
          <Route path="mysales" element={<Mysales />}></Route>
          <Route path="sellticket" element={<SellTicket />}></Route>
          <Route path="selltable" element={<SellTable />}></Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
