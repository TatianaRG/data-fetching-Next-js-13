import React from "react";

type Props = {
  promise: Promise<Post[]>;
};

const UserPosts = async ({ promise }: Props) => {
  //we are passing a props a promise
  const posts = await promise;

  return (
    posts.map((post) => {
      return (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <br />
        </article>
      );
    })
  ) 
};

export default UserPosts;
