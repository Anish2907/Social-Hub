import Navbar from "../Navbar";
import Leftbar from "../Leftbar";
import Rightbar from "../Rightbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
        <Navbar />
        <div style={{display: "flex"}}>
            <Leftbar />
            <div style={{flex: 6}}>
              <Outlet />
            </div>
            <Rightbar />
        </div>
    </div>
  );
}
