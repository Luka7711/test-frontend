import VerticalList from "./VerticalList";
import logo from "../imgs/product.png";
import carLogo from "../imgs/car.png";
import houseLogo from "../imgs/home.png";
import jobLogo from "../imgs/suitcase.png";

const boxContainer = {
  display: "flex",
  position: "absolute",
  top: "40%",
  left: "35%",
};

const box = {
  background: "#fff",
  width: "200px",
  height: "250px",
  borderRadius: "5px",
  marginRight: "10px",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  fontSize: "14px",
};

const content = {
  textAlign: "center",
  padding: "10px",
};

const imgs = [logo, carLogo, houseLogo, jobLogo];

const Create = () => {
  const links = ["your listings"];
  const header = (
    <>
      <h2>Create new listing</h2>
      <p>Choose listing type</p>
    </>
  );

  const headers = [
    "Item for Sale",
    "Vehicle for sale",
    "Home for Sale or Rent",
    "Job Opening",
  ];

  const description = [
    "Create a single listing for one or more items to sell",
    "Sell car, truck or other type of vehicle.",
    "List house or apartment for sale or rent.",
    "Post a job opportunity for public.",
  ];

  const items = headers.map((item, index) => {
    return (
      <div style={box}>
        <div style={content}>
          <h3>{item}</h3>
          <p>{description[index]}</p>
          <div>
            <img src={imgs[index]} alt="some" />
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="main-sidebar">
        {header}
        <VerticalList links={links} />
      </div>
      <div className="main-container">
        <div style={boxContainer}>{items}</div>
      </div>
    </>
  );
};

export default Create;
