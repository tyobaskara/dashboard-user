import React from "react";
import ReactDOM from "react-dom";
import style from "./style/app.scss";

const Index = () => {
  return (
    <div className="container">
      Hello React!
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById("index"));