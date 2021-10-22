import React from "react";
import { useHistory } from "react-router";

const LoadPostsList = ({posts}) => {
  const history = useHistory();

  const postsList = posts.map((post, index) =>
    <div key={index} onClick={() => history.push(`/viewPost/${post.id}`)}>
      <h3>{post.title}</h3>
      <p>{ 'author' in post ? post.author : null }</p>
      <p>{ 'branch' in post ? post.branch : null }</p>
      <p>{ 'institute' in post ? post.institute : null }</p>
    </div>
  );

  return postsList;
}

export default LoadPostsList;