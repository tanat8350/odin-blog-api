import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import removeHtmlTag from "../../utils/removeHtmlTags";

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/posts/published", { mode: "cors" })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("Server error");
        }
        return res.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <h1>Home</h1>
      {data &&
        data.map((post) => {
          return (
            <div className="card" key={post._id}>
              <h2>
                <a key={`${post._id}_title`} href={`posts/${post._id}`}>
                  {post.title}
                </a>
              </h2>
              <Link className="author" to={`users/${post.author._id}`}>
                {post.author.username}
              </Link>
              <p key={`${post._id}_content`}>{removeHtmlTag(post.content)}</p>
              <p className="nobotmargin" key={`${post._id}_timestamp`}>
                {new Date(post.timestamp).toLocaleString()}
              </p>
            </div>
          );
        })}
    </>
  );
};

export default Home;
