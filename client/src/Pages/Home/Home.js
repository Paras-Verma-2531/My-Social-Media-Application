import React, { useEffect } from "react";
import { axiosClient } from "../../Utils/axiosClient";

function Home() {
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const response = await axiosClient.get("/post/all");
    console.log("got the response", response);
  }
  return (
    <>
      <h1>Home</h1>
    </>
  );
}

export default Home;
