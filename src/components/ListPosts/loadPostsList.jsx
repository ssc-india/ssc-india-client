import React from "react";
import { useHistory } from "react-router";
import './index.scss';

const LoadPostsList = ({posts}) => {
  const history = useHistory();

  const postsList = posts.map((post, index) =>
    <div key={index} onClick={() => history.push(`/viewPost/${post.id}`)} className='LoadPostsList'>
      <h3>{post.title}</h3>
      <p>{ 'author' in post && post.author !== null ? post.author.username : '~Unknown Author~' }</p>
      <p>{ 'branch' in post ? post.branch : '~Unknown Branch~' }</p>
      <p>{ 'institute' in post ? post.institute : '~Unknown Institute~' }</p>
    </div>
  );

  return postsList;
}

export default LoadPostsList;