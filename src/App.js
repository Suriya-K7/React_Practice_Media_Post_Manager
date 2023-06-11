import Home from "./components/Home";
import About from "./components/About";
import Footer from "./components/Footer";
import Missing from "./components/Missing";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { useEffect, useState } from "react";
import { format } from "date-fns";

function App() {
  let [search, setSearch] = useState("");
  let [searchResults, setSearchResults] = useState("");
  let [postTitle, setPostTitle] = useState("");
  let [postBody, setPostBody] = useState("");
  let [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("post")) || []
  );
  useEffect(() => {
    let localStoragePosts = JSON.parse(localStorage.getItem("post")) || [];
    let filteredPosts = localStoragePosts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredPosts.reverse());
  }, [posts, search]);
  let navigate = useNavigate();
  let handleSubmit = (e) => {
    e.preventDefault();
    let id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    let datetime = format(new Date(), "MMMM dd, yyyy pp");
    let newPost = { id, title: postTitle, datetime, body: postBody };
    let allPosts = [...posts, newPost];
    setPosts(allPosts);
    localStorage.setItem("post", JSON.stringify(allPosts));
    setPostBody("");
    setPostTitle("");
    navigate("/");
  };
  let handleDelete = (id) => {
    let filteredPosts = posts.filter((post) => post.id !== id);
    setPosts(filteredPosts);
    localStorage.setItem("post", JSON.stringify(filteredPosts));
    navigate("/");
  };

  return (
    <div className="App">
      <Header />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route path="post">
          <Route
            index
            element={
              <NewPost
                handleSubmit={handleSubmit}
                postBody={postBody}
                setPostBody={setPostBody}
                postTitle={postTitle}
                setPostTitle={setPostTitle}
              />
            }
          />
          <Route
            path=":id"
            element={<PostPage posts={posts} handleDelete={handleDelete} />}
          />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
