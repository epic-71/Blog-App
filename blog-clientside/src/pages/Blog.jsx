import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import { axiosProtect } from "../Api/axios";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Header from "../components/Header";

function Blog({ blog }) {
  const location = useLocation();
  const navigate = useNavigate();
  blog = location.state;

  const [addComment, setAddComment] = useState();
  const [comments, setComments] = useState();

  const token = useSelector((state) => state.user.token);
  const protectedAxios = axiosProtect(token);

  const handleSubmit = () => {
    protectedAxios
      .post("/comment", { comment: addComment, blog: blog._id })
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
      });
    setAddComment("");
  };

  useEffect(() => {
    protectedAxios
      .get(`/comment/${blog._id}`)
      .then((res) => setComments(res.data.comments))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(comments);
  return (
    <div>
      <Header />
      <button onClick={() => navigate(-1)}>Back</button>
      <div>
        <h1>{blog.title}</h1>
        <p>{blog.description}</p>
      </div>

      <div>
        <input
          className="border border-blue-500 "
          type="text"
          placeholder="Type Comment"
          onChange={(e) => setAddComment(e.target.value)}
          value={addComment}
        />
        <Button onHandleSubmit={handleSubmit}> Add comment</Button>
      </div>

      {comments?.map((comment) => (
        <div key={comment._id} className="bg-blue-500">
          <h1>{comment.comment}</h1>
          <span>{format(comment.createdAt, "Pp")}</span>
        </div>
      ))}
    </div>
  );
}

export default Blog;
