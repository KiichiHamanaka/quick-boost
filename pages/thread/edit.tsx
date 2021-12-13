import React from "react";
import axios from "axios";

const editFind:React.FC = () => {
  const data = {};
  const aaa = () => {
    axios.post("/api/find", data).then((res) => {
      console.log(res.data);
    });
  };
  return <div>まだだよ</div>;
};

export default editFind;
