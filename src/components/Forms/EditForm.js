import React, { useState } from "react";

const EditForm = ({ dataEdit, setData }) => {
  const [username, setUsername] = useState(dataEdit.username);
  const [car, setCar] = useState(dataEdit.car);
  const [price, setPrice] = useState(dataEdit.price);

  const formStyle = {
    width: "300px",
    border: "1px solid #eee",
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#ee2",
  };

  const updateForm = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:9000/update-data/${dataEdit._id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          car: car,
          price: price,
        }),
      }
    );
    response.json().then(({ data }) => {
      console.log(data, "data all");
      setData(data);
    });
  };

  return (
    <div className="editForm" style={formStyle}>
      <h4>Edit Form</h4>
      <form>
        <label>
          Username
          <input
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </label>
        <br />
        <label>
          Car Model
          <input
            name="car"
            onChange={(e) => setCar(e.target.value)}
            value={car}
          />
        </label>
        <br />
        <label>
          Price
          <input
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </label>
        <button onClick={updateForm}>update</button>
      </form>
    </div>
  );
};

export default EditForm;
