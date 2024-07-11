import { Link } from "react-router-dom";

const PostCards = ({ data, author }) => {
  return (
    <>
      {data.map((item) => (
        <div key={item._id}>
          <h1>
            <Link to={`/posts/${item._id}`}>
              {item.title}
              {item.isPublished && " (Published)"}
              {author === true && item.author}
            </Link>
          </h1>
          <p>{item.content}</p>
          <p>{item.timestamp}</p>
        </div>
      ))}
    </>
  );
};

export default PostCards;
