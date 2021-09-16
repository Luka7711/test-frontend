import React, {useState, useEffect} from 'react';
import Registration from "./components/Forms/Registration";
import User from './User';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(2);
  const [count2, setCount2] = useState(3); 
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = async() => {
    const response = await axios("http://localhost:9000/", {
      method: "GET"
    });
    setUsers(response.data.users);
  }

  return (
    <div className="App">
      <User users={users}/>
      <Registration/>
    </div>
  );
}

export default App;
