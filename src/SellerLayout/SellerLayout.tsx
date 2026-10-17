
import { Outlet } from "react-router-dom";
import Header from "../components/SellerComp/Header";
import MainContent from "../components/ManagerComp/MainContent";

export default function SellerLayout() {
  return (
    <div className="min-h-screen bg-[#100719]">
      {/* Common header */}
      <Header />

      {/* Background image + page content */}
      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  );
}
