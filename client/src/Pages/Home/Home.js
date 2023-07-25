import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/navbar/Navbar";
function Home() {
  return <>
 <Navbar/>
 {/* either the feed or profile will appear bottom the navbar */}
 <Outlet/>
  </>
}
export default Home;
