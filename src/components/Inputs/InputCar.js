import PhotoBox from "./PhotoBox";

const InputCar = ({ inputs }) => {
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  let contentList = inputs.map((property, index) => {
    let inputForms = property.inputs.map((element, i) => {
      console.log(property, "property");
      return (
        <div key={i + 10}>
          {property.title !== "Description" ? (
            <input
              className="input-all"
              type={element.type}
              placeholder={element.input}
              onChange={handleChange}
            />
          ) : (
            <textarea
              className="textarea"
              placeholder="Write about the product"
            />
          )}
        </div>
      );
    });
    let header = (
      <div key={index}>
        <h3>{property.title}</h3>
        <h5>{property.header}</h5>
        {inputForms}
      </div>
    );
    return header;
  });
  return (
    <div className="main-sidebar">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submitted");
        }}
      >
        {contentList}
        <PhotoBox />
        <input type="submit" />
      </form>
    </div>
  );
};

export default InputCar;
