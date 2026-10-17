import { Outlet } from "react-router-dom";
import Header from "../components/ManagerComp/Header";
import MainContent from "../components/ManagerComp/MainContent";

export default function ManagerLayout() {
  return (
    <div className="min-h-screen bg-[#100719]">
      <Header />

      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  );
}
