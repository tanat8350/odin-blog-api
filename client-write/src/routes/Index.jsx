import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import PostCards from "../components/PostCards";
const Index = () => {
  const [user, setUser] = useOutletContext();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setData(null);
      return;
    }

    fetch("http://localhost:3000/users/" + user.id, {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((error) => setError(error));
  }, [user]);
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      {data ? (
        <>
          <h1>Your posts</h1>
          <Link to="new-post">Create new post</Link>
          <PostCards data={data} />
        </>
      ) : (
        <p>Please login</p>
      )}
    </>
  );
};

export default Index;
