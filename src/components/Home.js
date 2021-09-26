import Category from "./Category";

const Home = ({ products }) => {
  let productList = [];
  for (let product in products) {
    productList.push(
      <Category key={product} category={product} products={products[product]} />
    );
  }
  return <div>{productList}</div>;
};

export default Home;
