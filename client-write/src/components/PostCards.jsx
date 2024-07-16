import { Link } from "react-router-dom";

const PostCards = ({ data, author }) => {
  const removeHtmlTag = (str) => {
    return str.replace(/&lt;.*&gt;(.*)&lt;&#x2F;.*&gt;/g, "$1");
  };
  return (
    <>
      {data.map((item) => (
        <div key={item._id} className="card">
          <h2>
            <Link to={`/posts/${item._id}`}>
              {item.title}
              {item.isPublished && " (Published)"}
            </Link>
          </h2>
          {author && (
            <Link className="author" to={`/users/${item.author._id}`}>
              {item.author.username}
            </Link>
          )}
          <p>{removeHtmlTag(item.content)}</p>
          <p>{new Date(item.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </>
  );
};

export default PostCards;
