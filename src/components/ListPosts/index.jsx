import axios from "axios";
import React, { useEffect, useState } from "react";
import ListPostsFilter from "../ListPostsFilter";
import LoadPostsList from "./loadPostsList";

const serverURL = process.env.REACT_APP_BE_URL;
const showPostAPI = process.env.REACT_APP_View_Post;

const ListPosts = () => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState({});

  useEffect(() => {
    axios.get(serverURL + showPostAPI, { ...query })
      .then(res => setPosts(res.data.posts))
  }, [query]);

  return (
    <div>
      <ListPostsFilter setQuery={setQuery} />
      <LoadPostsList posts={posts} />
    </div>
  );
}

export default ListPosts;