import axios from "axios";

// Create an instance of axios with default settings
const Axios = axios.create({
  baseURL: "http://localhost:3031/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default Axios;
