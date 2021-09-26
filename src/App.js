import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import BrowseAll from "./components/BrowseAll";
import SideMenu from "./components/SideMenu";
import axios from "axios";
import Category from "./components/Category";
import "./App.css";

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
    <div className="App">
      <Router>
        <Navigation logged={logged} setLogged={setLogged} />
        <Switch>
          <Route exact path="/">
            <div style={{ display: "flex", marginTop: "50px" }}>
              <SideMenu />
              <BrowseAll products={products.data} />
            </div>
          </Route>
          <Route path="/listby">
            <Category products={listByCategory} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
