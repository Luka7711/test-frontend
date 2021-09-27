import BrowseAll from "./BrowseAll";
import SideMenu from "./SideMenu";

const Home = ({ logged, setLogged, products }) => {
  const style = {
    display: "flex",
  };
  return (
    <div style={style}>
      <SideMenu logged={logged} setLogged={setLogged} />
      <BrowseAll products={products.data} />
    </div>
  );
};

export default Home;
