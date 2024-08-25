import { useEffect, useState } from "react";
import useBlog from "../Hooks/useBlog";
import { useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { axiosProtect } from "../Api/axios";
import BlogModal from "./BlogModal";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const { getBlog } = useBlog();
  const navigate = useNavigate();
  const [blogId, setBlogId] = useState("");

  const token = useSelector((state) => state.user.token);
  const protectedAxios = axiosProtect(token);

  const handleDelete = (id) => {
    protectedAxios.delete(`/blog/${id}`);
  };

  useEffect(() => {
    getBlog().then((res) => setBlogs(res));
  }, []);

  useEffect(() => {
    console.log(blogs);
  }, [blogs]);
  return (
    <div className="grid grid-cols-3 gap-3">
      {blogs &&
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-slate-500  w-full grid grid-cols-[1fr_auto]"
          >
            {blog._id === blogId && <BlogModal blog={blog} />}
            <h1 onClick={() => navigate("/blog", { state: blog })}>
              {blog.title}
            </h1>

            <div className="space-x-2">
              <button onClick={() => setBlogId(blog._id)}>
                <MdOutlineEdit />
              </button>
              <button
                onClick={() => {
                  handleDelete(blog._id);
                }}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default BlogList;
