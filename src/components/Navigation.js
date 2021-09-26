const Navigation = ({ logged, setLogged }) => {
  const logout = (
    <>
      <li>Profile</li>
      <li onClick={() => setLogged(false)}>Logout</li>
    </>
  );
  const login = (
    <>
      <li>Sign in</li>
      <li>Sign up</li>
    </>
  );

  return (
    <div>
      <ul>{logged ? logout : login}</ul>
    </div>
  );
};

export default Navigation;
