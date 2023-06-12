import React, { useContext } from "react";
import DataContext from "../context/DataContext";

const NewPost = () => {
  let { handleSubmit, setPostBody, postBody, postTitle, setPostTitle } =
    useContext(DataContext);
  return (
    <main className="NewPost">
      <h2>New post</h2>
      <form onSubmit={handleSubmit} className="newPostForm">
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          placeholder="title"
          id="postTitle"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Comments:</label>
        <textarea
          placeholder="comments"
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
