import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadAuthorInfo from "./loadAuthorInfo";
import LoadPostContents from "./loadContents";

const serverURL = process.env.REACT_APP_BE_URL;
const showPostAPI = process.env.REACT_APP_View_Post;

const ShowPost = props => {
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get(serverURL + showPostAPI, { params: { id: props.id } })
      .then(res => {
        setPost(res.data.posts[0]);
        props.setQuery({ institute: res.data.posts[0].institute });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id]);

  return (
    <div>
      <h2>{post.title}</h2>
      <h4>{post.timestamp}</h4>
      <div>
        <LoadPostContents
          contents={post.content}
        />
      </div>
      <LoadAuthorInfo
        post={post}
      />
    </div>
  );
}

export default ShowPost;