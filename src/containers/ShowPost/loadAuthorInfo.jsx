import React from "react";

const LoadAuthorInfo = ({post}) =>
  post.tag === 'blog' ?
    <div>
      <h4>Author: {post.author}</h4>
      <p>Institute: {post.institute}</p>
      <p>Branch: {post.branch}</p>
    </div> :
    null;

export default LoadAuthorInfo;