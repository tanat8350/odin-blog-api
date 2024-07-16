import { useState, useEffect } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import PostCards from "../components/PostCards";
const Index = () => {
  const { id } = useParams();
  const [user, setUser] = useOutletContext();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setData(null);
      return;
    }

    fetch("http://localhost:3000/users/" + id, {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((json) => setData(json))
      .then(console.log(data))
      .catch((error) => setError(error));
  }, []);
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      {data ? (
        <>
          <h1>{data[0].author.username}'s posts</h1>
          <PostCards data={data} />
        </>
      ) : (
        <p>Please login</p>
      )}
    </>
  );
};

export default Index;
