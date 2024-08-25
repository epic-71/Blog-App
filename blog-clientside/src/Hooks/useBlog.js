import { useSelector } from "react-redux";
import { axiosProtect } from "../Api/axios";

function useBlog() {
  const token = useSelector((state) => state.user.token);
  const protectedAxios = axiosProtect(token);

  const getBlog = async () => {
    try {
      const blog = await protectedAxios.get("/blog");
      return blog.data.blogs;
    } catch (error) {
      console.log(error);
    }
  };

  const createBlog = async (value) => {
    try {
      const { data, status } = await protectedAxios.post(
        "/blog/createBlog",
        value
      );

      if (status == 200) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const updateBlog = async (id,value) => {
    try {
      const { data, status } = await protectedAxios.patch(
        `/blog/${id}`,
        value
      );

      if (status == 200) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { createBlog, getBlog,updateBlog };
}

export default useBlog;
