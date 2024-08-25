import { useState } from "react";
import BlogCreate from "../components/BlogCreate";
import BlogList from "../components/BlogList";
import Header from "../components/Header";

function Home() {
  const [modal, setModal] = useState(false);
  return (
    <div className="">
      <Header />
      <button onClick={() => setModal(!modal)}>Add Blog</button>
      {modal && <BlogCreate />}
      <BlogList />
    </div>
  );
}

export default Home;
