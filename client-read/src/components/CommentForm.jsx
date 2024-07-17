import { useNavigate } from "react-router-dom";

const CommentForm = ({ onSubmit, data, setData, deleteBtn }) => {
  // if deleteBtn = update
  const navigate = useNavigate();
  const onClickDelete = async () => {
    await fetch(
      "http://localhost:3000/posts/" + data.post + "/comments/" + data._id,
      {
        mode: "cors",
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      },
    );
    navigate("/posts/" + data.post);
  };
  return (
    <>
      <form className="comment-form" onSubmit={onSubmit}>
        <div className="comment-content">
          <label className="nobotmargin" htmlFor="content">
            Comment: &nbsp;
          </label>
          <textarea
            name="content"
            id="content"
            onChange={(e) =>
              setData({
                ...data,
                content: e.target.value,
              })
            }
            value={data ? data.content : ""}
          ></textarea>
        </div>
        <button className="button" type="submit">
          {deleteBtn ? "Update" : "Submit"}
        </button>
        {deleteBtn && (
          <button className="button deleteButton" onClick={onClickDelete}>
            Delete
          </button>
        )}
      </form>
    </>
  );
};

export default CommentForm;
