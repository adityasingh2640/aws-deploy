import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import Axios from "axios";
import baseURL from "./baseurl.js";

function App() {
  const [url,setURL] = useState("");
  useEffect(() => {
    let axios = Axios.create()
    axios.post("/api/todo", { text: "Aditya", isDone: true }).then(resp => {
      console.log(resp.data);
      if(resp?.data?.text) setURL(resp.data.text)
    })
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello <code>{url}</code>.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
