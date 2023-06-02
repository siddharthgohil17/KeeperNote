import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./component/header/header.js";
import Addkeeper from "./component/addkeeper/addkeeper.js";
import ShowKeeper from "./component/showkeeper/showkeeper.js";

function App() {
  const [list, setList] = useState([]);

  const addnote = (newitem) => {
    setList((prevnote) => [...prevnote, newitem]);
  };

  const deleteitem = async (id) => {
    const itemToDelete = list[id];

    try {
      await axios.post("https://taskmanager-ffsb.onrender.com/api/delete", itemToDelete);
      console.log("Item deleted successfully");
    
      setList((prevlist) => prevlist.filter((item, index) => index !== id));
    } catch (error) {
      console.error("API request failed:", error);
    }
  };
 
  

  useEffect(() => {
    axios
      .get("https://taskmanager-ffsb.onrender.com/api/getAll")
      .then((res) => {
        setList(res.data);
      })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <Addkeeper onADD={addnote} />
      <div className="row">
        {list.map((item, index) => (
          <ShowKeeper
            key={index}
            id={index}
            title={item.title}
            description={item.description}
            deleteKeeper={deleteitem}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
