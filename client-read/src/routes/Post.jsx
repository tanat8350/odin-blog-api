import { useState, useEffect } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import ErrorValification from "../components/ErrorValification";
import CommentForm from "../components/CommentForm";

const Post = () => {
  const [user, setUser] = useOutletContext();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [error, setError] = useState(null);
  const [valError, setValError] = useState(null);
  const { id } = useParams();

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/posts/" + id + "/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        content: commentData.content,
        author: user.id,
      }),
      mode: "cors",
    });
    try {
      const json = await res.json();
      if (json.errors) {
        setValError(json.errors);
      }
    } catch {
      setCommentData(null);
      setComments(null);
    }
  };
  useEffect(() => {
    fetch("http://localhost:3000/posts/" + id, { mode: "cors" })
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

    fetch("http://localhost:3000/posts/" + id + "/comments", { mode: "cors" })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("Server error");
        }
        return res.json();
      })
      .then((json) => {
        setComments(json);
      })
      .catch((error) => {
        setError(error);
      });
  }, [id, comments]);
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <div className="card">
        <h2 className="title">{data && data.title}</h2>
        {data && (
          <Link className="author" to={`/users/${data.author._id}`}>
            {data.author.username}
          </Link>
        )}
        <p>{data && data.content}</p>
        <p>{data && data.timestamp}</p>
      </div>
      {user ? (
        <>
          <CommentForm
            onSubmit={onSubmit}
            data={commentData}
            setData={setCommentData}
          />
          <ErrorValification error={valError} />
        </>
      ) : (
        <p>
          <Link to="/login">Login</Link> to comment
        </p>
      )}
      {comments && comments.length > 0 ? (
        comments.map((comment) => {
          return (
            <div className="comment-card" key={comment._id}>
              <p className="first-child">
                {user && user.id === comment.author._id && (
                  <>
                    <Link to={`./comments/${comment._id}`}>[Edit] </Link>
                  </>
                )}
                {comment.content}
              </p>
              <p className="nobotmargin">
                {new Date(comment.timestamp).toLocaleString()} by&nbsp;
                <Link className="author" to={`/users/${comment.author._id}`}>
                  {comment.author.username}
                </Link>
              </p>
            </div>
          );
        })
      ) : (
        <p>No comments</p>
      )}
    </>
  );
};

export default Post;
