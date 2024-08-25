import { Form, Formik } from "formik";
import InputForm from "./InputForm";
import Button from "../Components/Button";
import { blogValidation } from "../../util/Validation";
import useBlog from "../Hooks/useBlog";

function BlogCreate() {
  const { createBlog } = useBlog();

  const initialValue = {
    title: "",
    description: "",
  };

  const handleSubmit = (value) => {
    console.log(value);
    createBlog(value);
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
        <Button type="submit">Create</Button>
      </Form>
    </Formik>
  );
}

export default BlogCreate;
