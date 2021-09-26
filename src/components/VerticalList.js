const VerticalList = ({ links }) => {
  const list = links.map((link, i) => {
    return (
      <li key={i} className="link">
        {link}
      </li>
    );
  });
  return <ul>{list}</ul>;
};

export default VerticalList;
