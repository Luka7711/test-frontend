const Category = ({ products, category }) => {
  const someList = [];
  let key = 0;

  const productStyle = {
    width: "300px",
  };

  const list = products.map((productObject, i) => {
    let addsBlock = [];
    for (const product in productObject) {
      key++;
      let content = (
        <li key={key}>
          {product} - {productObject[product]}
        </li>
      );
      addsBlock.push(content);
    }
    let wrapper = (
      <div style={productStyle} key={i}>
        <ul>{addsBlock}</ul>
      </div>
    );
    someList.push(wrapper);
  });
  return (
    <div className="product-box">
      <h4>{category.toUpperCase()}</h4>
      <ul style={{ display: "flex" }}>{someList}</ul>
    </div>
  );
};

export default Category;
