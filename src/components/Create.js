import VerticalList from "./VerticalList";

const Create = () => {
  const links = ["Choose lising type", "your listings"];
  const header = <h2>Create new listing</h2>;
  return (
    <div className="main-sidebar">
      {header}
      <VerticalList links={links} />
    </div>
  );
};

export default Create;
