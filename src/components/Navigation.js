import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const Navigation = ({ logged, setLogged }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [logged]);

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(`http://localhost:9000/user/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      response = await response.json();
      if (response.status === 200) {
        setLogged(true);
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = (
    <div style={{ display: "flex" }}>
      <li>Profile</li>
      <li
        onClick={() => {
          setLogged(false);
          history.push("/");
        }}
      >
        Logout
      </li>
    </div>
  );
  const login = (
    <div style={{ display: "flex" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Log in</button>
      </form>
      <li>Sign up</li>
    </div>
  );

  return (
    <div className="navigation">
      <ul className="nav-ul">
        <div>
          <li onClick={() => history.push("/")}>Home</li>
        </div>
        {logged ? logout : login}
      </ul>
    </div>
  );
};

export default Navigation;
