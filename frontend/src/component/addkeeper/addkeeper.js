import React, { useState } from "react";
import axios from "axios";
import "./addKeeper.css";

const AddKeeper = (props) => {
  const [keeperObj, setKeeperObj] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKeeperObj({
      ...keeperObj,
      [name]: value,
    });
  };

  const add = () => {
    if (keeperObj.title) {
      axios
        .post("http://localhost:3001/api/addNew", keeperObj)
        .then((res) => {
          // Call the onADD function from props to update the state in the parent component
          props.onADD(keeperObj);
          console.log(res.data);
  
          // Clear the input fields
          setKeeperObj({
            title: "",
            description: "",
          });
        })
        .catch((error) => {
          console.error("Error adding data:", error);
        });
    }
  };
  
  return (
    <div className="addKeeper">
      <input
        className="inputBox titleInput"
        name="title"
        placeholder="Enter Title Here"
        onChange={handleChange}
        value={keeperObj.title}
      />
      <textarea
        className="inputBox description"
        name="description"
        placeholder="Enter Description Here"
        onChange={handleChange}
        value={keeperObj.description}
      />
      <button className="addButton" onClick={add}>
        Add
      </button>
    </div>
  );
};

export default AddKeeper;
