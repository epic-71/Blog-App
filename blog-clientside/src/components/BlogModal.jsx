import { Form, Formik } from "formik";
import InputForm from "./InputForm";
import Button from "../Components/Button";
import { blogValidation } from "../../util/Validation";
import useBlog from "../Hooks/useBlog";

function BlogModal({ blog }) {
  const { updateBlog } = useBlog();

  const initialValue = {
    title: blog.title,
    description: blog.description,
  };

  const handleSubmit = (value) => {
    console.log(value);
    updateBlog(blog._id, value);
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={blogValidation}
      onSubmit={handleSubmit}
    >
      <Form>
        <InputForm label={"Title"} name={"title"} type="string" />
        <InputForm label={"Description"} name={"description"} type="string" />
        <Button type="submit">Update</Button>
      </Form>
    </Formik>
  );
}

export default BlogModal;
