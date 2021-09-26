import VerticalList from "./VerticalList";

const SideMenu = () => {
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
  return (
    <div className="main-sidebar">
      <div>
        <h2>Marketplace</h2>
        <VerticalList links={accountLinks} />
      </div>
      <div>
        <h4>Categories</h4>
        <VerticalList links={categoryLinks} />
      </div>
    </div>
  );
};

export default SideMenu;
