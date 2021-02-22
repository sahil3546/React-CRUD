import axios from "axios";

export default axios.create({
  baseURL: "https://react-json-server3546.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});