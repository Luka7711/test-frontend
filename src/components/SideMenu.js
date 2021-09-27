import VerticalList from "./VerticalList";

const SideMenu = ({ logged, setLogged }) => {
  const searchStyle = {
    padding: "10px",
    marginLeft: "10px",
    borderRadius: "14px",
    border: "none",
    fontStyle: "italic",
    backgroundColor: "#eee",
  };
  const accountLinks = [
    "Browse All",
    "Notifications",
    "Inbox",
    "Cart",
    "Your Account",
    "Create new listing",
  ];

  const categoryLinks = [
    "Vehicles",
    "Property Rentals",
    "Apparel",
    "Electronics",
    "Entertainment",
    "Family",
    "Free Stuff",
    "Garden & Outdoor",
    "Home Goods",
    "Home Impovement Supplies",
    "Home Sales",
    "Musical Instruments",
    "Office Supplies",
    "Pet Supplies",
    "Sporting Goods",
    "Toys & Games",
  ];

  const guestLinks = ["Browse All", "Create Account"];

  return (
    <div className="main-sidebar">
      <div>
        <h2>Marketplace</h2>
        <form>
          <input placeholder="search" style={searchStyle} className="search" />
        </form>
        <VerticalList links={logged ? accountLinks : guestLinks} />
      </div>
      <div>
        <h4>Categories</h4>
        <VerticalList links={categoryLinks} />
      </div>
    </div>
  );
};

export default SideMenu;
