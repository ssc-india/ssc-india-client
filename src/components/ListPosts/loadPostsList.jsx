import React from "react";
import './index.css';

const LoadPostsList = ({posts}) =>
  posts.map((post, index) =>
    <div key={index} className='LoadPostsList'>
      <h3>{post.title}</h3>
      <p>{ 'author' in post ? post.author : null }</p>
      <p>{ 'branch' in post ? post.branch : null }</p>
      <p>{ 'institute' in post ? post.institute : null }</p>
    </div>
  );

export default LoadPostsList;