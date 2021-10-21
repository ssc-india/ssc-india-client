import axios from "axios";
import React, { useEffect, useState } from "react";

const serverURL = process.env.REACT_APP_BE_URL;
const showPostAPI = process.env.REACT_APP_View_Post;

const ShowPost = props => {
  const [post, setPost] = useState();

  useEffect(() => {
    axios.get(serverURL + showPostAPI, { params: { id: props.id } })
      .then(res => setPost(res.data))
  }, [props.id]);

  const loadAuthorInfo = post.tag === 'blog' ?
    <div>
      <h4>Author: {post.author}</h4>
      <p>Institute: {post.institute}</p>
      <p>Branch: {post.branch}</p>
    </div> :
    null;

  return (
    <div>
      <h2>{post.title}</h2>
      <h4>{post.timestamp}</h4>

      {loadAuthorInfo}
    </div>
  );
}

export default ShowPost;