import { useHistory } from "react-router";

const VerticalList = ({ links }) => {
  let history = useHistory();
  const list = links.map((link, i) => {
    let url = link.toLowerCase().split(" ").join("");
    url = url === "browseall" ? "/" : `/browse/${url}`;
    return (
      <li
        key={i}
        className="link"
        onClick={() => {
          history.push(url);
        }}
      >
        {link}
      </li>
    );
  });
  return <ul>{list}</ul>;
};

export default VerticalList;
