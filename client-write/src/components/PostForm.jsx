import { useNavigate } from "react-router-dom";
import ErrorValification from "./ErrorValification";

const PostForm = ({
  title,
  button,
  data,
  setData,
  onSubmit,
  error,
  deleteId,
}) => {
  const navigate = useNavigate();
  const clickDelete = async () => {
    await fetch("http://localhost:3000/posts/" + deleteId, {
      mode: "cors",
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    navigate("/");
  };
  return (
    <>
      <h1>{title}</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={data ? data.title : ""}
            onChange={(e) => {
              setData({ ...data, title: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="content">Content: </label>
          <textarea
            name="content"
            id="content"
            value={data ? data.content : ""}
            onChange={(e) => {
              setData({ ...data, content: e.target.value });
            }}
          ></textarea>
        </div>
        <div>
          <label htmlFor="isPublished">Published: </label>
          <input
            type="checkbox"
            name="isPublished"
            id="isPublished"
            checked={data ? data.isPublished : false}
            onChange={(e) => {
              setData({ ...data, isPublished: e.target.checked });
            }}
          />
        </div>
        <button type="submit">{button}</button>
        {deleteId && <button onClick={clickDelete}>Delete</button>}
      </form>
      <ErrorValification error={error} />
    </>
  );
};

export default PostForm;
