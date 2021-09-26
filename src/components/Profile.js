import VerticalList from "./VerticalList";

const Profile = () => {
  const links = [
    "Browse All",
    "Notifications",
    "Inbox",
    "Cart",
    "Your Account",
  ];
  return (
    <div>
      <VerticalList links={links} />
    </div>
  );
};

export default Profile;
