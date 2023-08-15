import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import RequireUser from "./Components/RequireUser";
import { Route, Routes } from "react-router-dom";
import Feed from "./Components/feed/Feed";
import Profile from "./Components/profile/Profile";
import UpdateProfile from "./Components/updateProfile/UpdateProfile";
import LoadingBar from "react-top-loading-bar";
import { useSelector } from "react-redux";
import { useEffect, useRef} from "react";
import OnlyIfNotLoggedIn from "./Components/OnlyIfNotLoggedIn";
function App() {
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);//subscribe to the loadingSlice reducer
  const loadingRef = useRef(null);
  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);
  return (
    <>
      <LoadingBar color="#4db4f8" ref={loadingRef} />
      <Routes>
        {/* set path to various elements based on endpoint */}
        {/* protected route:: if user is loged-in navigate to home*/}
        <Route element={<RequireUser/>}>
          <Route element={<Home/>}>
            {/* if no path navigate to feed */}
              <Route path="/" element={<Feed/>}/>
            {/* if path is profile with id : navigate to userProfile */}
            <Route path="/profile/:userId" element={<Profile/>}/>
            <Route path="/updateProfile" element={<UpdateProfile/>}/>
          </Route>
        </Route>
        {/* if user is not logged In then navigate to home : else login/signup */}
        <Route element={<OnlyIfNotLoggedIn/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
