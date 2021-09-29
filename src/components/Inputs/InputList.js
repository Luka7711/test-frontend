const InputList = ({ inputs }) => {
  let contentList = inputs.map((property, index) => {
    let inputForms = property.inputs.map((element, i) => {
      return (
        <div key={i + 10}>
          <input
            className="input-all"
            type={element.type}
            placeholder={element.input}
          />
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
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submitted");
        }}
      >
        {contentList}
        <input type="submit" />
      </form>
    </div>
  );
};

export default InputList;
