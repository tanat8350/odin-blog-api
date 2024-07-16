import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Root.css";

const Root = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      const localUser = JSON.parse(localStorage.getItem("user"));
      if (localUser.isAdmin) {
        navigate("/");
        return;
      }
      setUser(localUser);
    }
  }, []);
  return (
    <>
      <nav>
        <p>Admin page</p>
        <ul>
          <li>
            <Link to="/">{user ? "Your posts" : "Home"}</Link>
          </li>
          {user && (
            <li>
              <Link to="/posts">All Posts</Link>
            </li>
          )}
        </ul>
        {user ? (
          <ul>
            <li>
              <p>{user.username}</p>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/login">Login in</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
          </ul>
        )}
      </nav>
      <div className="outlet">
        <Outlet context={[user, setUser]}></Outlet>
      </div>
    </>
  );
};

export default Root;
