import VerticalList from "./VerticalList";

const CategoryLinks = () => {
  const links = [
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
    <div>
      <VerticalList links={links} />
    </div>
  );
};

export default CategoryLinks;
