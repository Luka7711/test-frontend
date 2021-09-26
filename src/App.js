import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Profile from "./components/Profile";
import CategoryLinks from "./components/CategoryLinks";
import axios from "axios";
import Category from "./components/Category";

const App = () => {
  const [products, setProducts] = useState([]);
  const [logged, setLogged] = useState(false);
  const [listByCategory, setListByCategory] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let response = await axios("http://localhost:9000/get-ads");
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Router>
      <Navigation logged={logged} setLogged={setLogged} />
      <Profile />
      <CategoryLinks />
      <Switch>
        <Route exact path="/">
          <Home products={products.data} />
        </Route>
        <Route path="/listby">
          <Category products={listByCategory} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
