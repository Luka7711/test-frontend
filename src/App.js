import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import axios from "axios";
import Category from "./components/Category";
import "./App.css";
import Register from "./components/Forms/Register";
import Home from "./components/Home";
import Create from "./components/Create";
import ProductForm from "./components/Forms/ProductForm";

const Space = () => {
  return <div style={{ marginTop: "50px" }}></div>;
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [logged, setLogged] = useState(false);
  const [listByCategory, setListByCategory] = useState([]);
  const [userId, setUserId] = useState("");

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
        <Space />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home logged={logged} setLogged={setLogged} products={products} />
            )}
          />
          <Route
            path="/listby"
            render={() => <Category products={listByCategory} />}
          />
          <Route
            path="/browse/createaccount"
            render={() => (
              <Register setLogged={setLogged} setUserId={setUserId} />
            )}
          />
          <Route path="/browse/createnewlisting" render={() => <Create />} />
          <Route
            path="/browse/create/product"
            render={() => <ProductForm productCategory={"product"} />}
          />
          <Route
            path="/browse/create/car"
            render={() => <ProductForm productCategory={"car"} />}
          />
          <Route
            path="/browse/create/property"
            render={() => <ProductForm productCategory={"property"} />}
          />
          <Route
            path="/browse/create/job"
            render={() => <ProductForm productCategory={"job"} />}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
