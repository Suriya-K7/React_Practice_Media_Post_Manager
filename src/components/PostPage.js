import React from "react";
import { Link, useParams } from "react-router-dom";

const PostPage = ({ posts, handleDelete }) => {
  let { id } = useParams();
  let post = posts.find((post) => post.id.toString() === id);
  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body} </p>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post not found</h2>
            <Link to="/">
              <p>Kindly Visit Our Homepage and Explore</p>
            </Link>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
