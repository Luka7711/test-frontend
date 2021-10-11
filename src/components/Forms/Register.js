import { useState } from "react";
import { useHistory } from "react-router";
import "./SignForm.css";

const Register = ({ setLogged, setUserId }) => {
  let history = useHistory();
  const [selected, setSelected] = useState("Male");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:9000/new-user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          gender: selected,
          email: email,
          password: password,
        }),
      });
      response = await response.json();
      if (response.status === 200) {
        setLogged(true);
        setUserId(response.user._id);
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signup-container">
      <div className="image-container">
        <img
          src="https://craftindustryalliance.org/wp-content/uploads/2016/06/computer-to-shopping-cart-comic.png"
          alt="main-img"
        />
      </div>
      <form onSubmit={handleSubmit} className="signup-form">
        <div>
          <h1>Sign Up</h1>
          <p>Welcome to Marketplace.</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            className="input-name input-all"
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            className="input-name input-all"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="input-all"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="input-all"
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h5>Gender</h5>
          <input
            type="radio"
            value="Male"
            id="male"
            checked={selected === "Male"}
            onChange={(e) => setSelected(e.target.value)}
          />
          Male
          <input
            type="radio"
            value="Female"
            id="female"
            checked={selected === "Female"}
            onChange={(e) => setSelected(e.target.value)}
          />
          Female
          <input
            type="radio"
            value="Custom"
            id="custom"
            checked={selected === "Custom"}
            onChange={(e) => setSelected(e.target.value)}
          />
          Custom
        </div>
        <button className="signup-btn"> Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
