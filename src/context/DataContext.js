import { createContext, useEffect, useState } from "react";
import { format } from "date-fns";
import useWindowSize from "../hooks/useWindowSize";
import { useNavigate } from "react-router-dom";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  let [search, setSearch] = useState("");
  let [searchResults, setSearchResults] = useState("");
  let [postTitle, setPostTitle] = useState("");
  let [editTitle, setEditTitle] = useState("");
  let [postBody, setPostBody] = useState("");
  let [editBody, setEditBody] = useState("");
  let { width } = useWindowSize();
  // if using through local storage

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
  /*---------------------------- */
  // if used from server
  /*
      let [posts, setPosts] = useState([]);
  useEffect(() => {
    let fetchPost = async () => {
      try {
        let response = await api.get("/posts");
        setPosts(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          console.log(error);
        }
      }
    };
    fetchPost();
  }, []);
  useEffect(() => {
    let filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredPosts.reverse());
  }, [posts, search]);
  */
  /*------------------------------------- */
  let navigate = useNavigate();
  let handleSubmit = async (e) => {
    e.preventDefault();
    let id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    let datetime = format(new Date(), "MMMM dd, yyyy pp");
    let newPost = { id, title: postTitle, datetime, body: postBody };
    // if used from server
    /*
    try {
      let response = await api.post("/posts", newPost);
      let allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostBody("");
      setPostTitle("");
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else {
        console.log(error);
      }
    }*/
    /*--------------------------- */
    // if using through local storage
    let allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostBody("");
    setPostTitle("");
    navigate("/");
    localStorage.setItem("post", JSON.stringify(allPosts));

    /*---------------------------- */
  };
  let handleDelete = async (id) => {
    // if used from server
    /*
    try {
      await api.delete(`/posts/${id}`);
      let filteredPosts = posts.filter((post) => post.id !== id);
      setPosts(filteredPosts);
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else {
        console.log(error);
      }
    }
    */
    /*----------------------------- */
    // if using through local storage
    let filteredPosts = posts.filter((post) => post.id !== id);
    setPosts(filteredPosts);
    navigate("/");
    localStorage.setItem("post", JSON.stringify(filteredPosts));
    /*---------------------------- */
  };
  let handleEdit = async (id) => {
    let datetime = format(new Date(), "MMMM dd, yyyy pp");
    let editedPost = { id, title: editTitle, datetime, body: editBody };
    // if used from server
    /*
    try {
      let response = await api.put(`/posts/${id}`, editedPost);
      let updatedPost = posts.map((post) =>
        post.id === id ? { ...response.data } : post
      );
      setPosts(updatedPost);
      setEditBody("");
      setEditTitle("");
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else {
        console.log(error);
      }
    }
    */
    /*--------------------------- */
    // if using through local storage
    let updatedPost = posts.map((post) =>
      post.id === id ? { ...editedPost } : post
    );
    setPosts(updatedPost);
    setEditBody("");
    setEditTitle("");
    navigate("/");
    localStorage.setItem("post", JSON.stringify(updatedPost));
    /*---------------------------- */
  };
  return (
    <DataContext.Provider
      value={{
        width,
        search,
        setSearch,
        searchResults,
        handleSubmit,
        postBody,
        setPostBody,
        postTitle,
        setPostTitle,
        posts,
        handleDelete,
        handleEdit,
        editBody,
        setEditTitle,
        editTitle,
        setEditBody,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
