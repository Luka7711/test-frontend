import React, { useState, useEffect } from "react";
import Registration from "./Forms/Registration";
import axios from "axios";
import EditForm from "./Forms/EditForm";

const List = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(data, "data");
  });

  const getData = async () => {
    const response = await axios.get("http://localhost:9000/clients");
    setData(response.data.users);
  };

  const deleteItem = async (id) => {
    const response = await axios(`http://localhost:9000/user/${id}`, {
      method: "DELETE",
    });
    setData(response.data.users);
  };

  const userList = data.map((user, i) => {
    return (
      <div
        key={i}
        style={{
          border: "1px solid black",
          width: "200px",
          float: "left",
          padding: "15px",
          marginRight: "10px",
          marginTop: "20px",
        }}
      >
        <h3>Name: {user.username}</h3>
        <h3>
          {user.car}-{user.price}
        </h3>
        <button onClick={() => deleteItem(user._id)}>Delete</button>
        <button
          onClick={() => {
            setUpdate(!update);
            setDataEdit(user);
          }}
        >
          Edit
        </button>
      </div>
    );
  });
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Registration setData={setData} />
        {update ? <EditForm setData={setData} dataEdit={dataEdit} /> : null}
      </div>
      {userList}
    </div>
  );
};

export default List;
