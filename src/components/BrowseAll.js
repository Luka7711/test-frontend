import Category from "./Category";

const BrowseAll = ({ products }) => {
  let productList = [];
  for (let product in products) {
    productList.push(
      <Category key={product} category={product} products={products[product]} />
    );
  }
  return <div className="main-container">{productList}</div>;
};

export default BrowseAll;
