import React, { useState } from "react";

const Registration = ({ setData }) => {
  const [username, setUsername] = useState("");
  const [car, setCar] = useState("");
  const [price, setPrice] = useState(0);
  const fileInputState = "";
  const [previewSource, setPreviewSource] = useState();

  const registerStyle = {
    width: "300px",
    padding: "20px",
    border: "1px solid #eee",
    backgroundColor: "#eae8e8",
  };

  const inputStyle = {
    marginTop: "30px",
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;

      case "car":
        setCar(e.target.value);
        break;

      case "price":
        setPrice(e.target.value);
        break;

      default:
        break;
    }
  };

  const create = async (e, base64EncodedImage) => {
    e.preventDefault();

    const response = await fetch("http://localhost:9000/new-data", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        car: car,
        price: price,
        image: base64EncodedImage,
      }),
    });
    response.json().then((data) => {
      setData(data.message);
    });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      setPreviewSource(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={registerStyle}>
      <h4>Register new car</h4>
      <form onSubmit={(e) => create(e, previewSource)}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={username}
            style={inputStyle}
          />
        </label>
        <br />
        <label>
          Car Model:
          <input
            style={inputStyle}
            type="text"
            name="car"
            onChange={handleChange}
            value={car}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            name="price"
            onChange={handleChange}
            value={price}
            style={inputStyle}
          />
        </label>
        <br />
        {previewSource && (
          <img
            style={{ width: "100%", marginTop: "20px" }}
            src={previewSource}
            alt="chosen"
          />
        )}
        <input
          type="file"
          name="file"
          value={fileInputState}
          onChange={handleFileInputChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Registration;
