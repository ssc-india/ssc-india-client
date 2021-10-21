import React from "react";

const LoadPostsList = ({posts}) =>
  posts.map((post, index) =>
    <div key={index}>
      <h3>{post.title}</h3>
      <p>{ 'branch' in post ? post.branch : null }</p>
      <p>{ 'institute' in post ? post.institute : null }</p>
    </div>
  );

export default LoadPostsList;