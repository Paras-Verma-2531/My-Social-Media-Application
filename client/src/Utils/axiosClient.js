import axios from "axios";
// axios is better than fetch to call API's because of intercepters
 export const axiosClient=axios.create(
    {
     baseURL:'http://localhost:4019',
     withCredentials:true// prevent sending cookie to the frontEnd from backend
    }
)
