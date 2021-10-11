const AddPhoto = ({ handleClick }) => {
  const container = {
    backgroundColor: "#fff",
    width: "90px",
    height: "90px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const text = {
    color: "black",
    margin: "0",
  };
  return (
    <div style={container} onClick={handleClick}>
      <div
        style={{
          fontSize: "20px",
          backgroundColor: "#d8d8d8",
          padding: "10px",
          borderRadius: "50%",
        }}
      >
        <i style={text} className="fas fa-images"></i>
      </div>
      <p style={text}>Add Photos</p>
    </div>
  );
};

export default AddPhoto;
