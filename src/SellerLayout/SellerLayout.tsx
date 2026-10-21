
import { Outlet } from "react-router-dom";
import Header from "../components/SellerComp/Header";
import MainContent from "../components/ManagerComp/MainContent";
import Sidebar from "../components/SellerComp/Sidebar";

export default function SellerLayout() {
  return (
  <>
   <Header />
    <MainContent>
          <div className="flex items-stretch gap-4">
            <div className="hidden md:flex md:self-stretch">
              <Sidebar />
            </div>
            <div className="min-w-0 flex-1">
              <Outlet />
            </div>
          </div>
        </MainContent>

  </>
 );
}
