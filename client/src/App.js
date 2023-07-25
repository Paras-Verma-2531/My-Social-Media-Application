import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import RequireUser from "./Components/RequireUser";
import { Route, Routes } from "react-router-dom";
import Feed from "./Components/feed/Feed";
import Profile from "./Components/profile/Profile";
function App() {
  return (
    <>
      <Routes>
        {/* set path to various elements based on endpoint */}
        {/* protected route:: if user is loged-in navigate to home*/}
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            {/* when path is empty show feeds bottom the navbar else profile */}
            <Route path='/' element={<Feed/>}/>
            <Route path='/profile/:userId' element={<Profile/>}/>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
export default App;
