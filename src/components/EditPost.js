import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DataContext from "../context/DataContext";

const EditPost = () => {
  let { handleEdit, editBody, setEditBody, editTitle, setEditTitle, posts } =
    useContext(DataContext);
  let { id } = useParams();
  let post = posts.find((post) => post.id.toString() === id);
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditBody, setEditTitle]);
  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit post</h2>
          <form onSubmit={(e) => e.preventDefault()} className="newPostForm">
            <label htmlFor="editTitle">Title:</label>
            <input
              type="text"
              placeholder="title"
              id="editTitle"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="editBody">Comments:</label>
            <textarea
              placeholder="comments"
              id="editBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button onClick={() => handleEdit(post.id)}>Update</button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post not found</h2>
          <Link to="/">
            <p>Kindly Visit Our Homepage and Explore</p>
          </Link>
        </>
      )}
    </main>
  );
};

export default EditPost;
