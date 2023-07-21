import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import RequireUser from "./Components/RequireUser";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        {/* set path to various elements based on endpoint */}
        {/* protected route:: if user is loged-in navigate to home*/}
        <Route element={<RequireUser />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
export default App;
