import React from "react";
import "./showkeeper.css";

const ShowKeeper = (props) => {
  const handleDelete = () => props.deleteKeeper(props.id);

  return (
    <div className="showKeeper col-md-3" key={props.id}>
      <div className="keeperCard"  >
        <h1 className="title">
          {props.title}
          <i className="deleteIcon fa fa-trash" onClick={handleDelete}></i>
        </h1>
        <textarea className="descriptionBox" defaultValue={props.description}></textarea>
      </div>
    </div>
  );
};

export default ShowKeeper;
