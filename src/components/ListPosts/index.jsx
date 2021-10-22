import axios from "axios";
import React, { useEffect, useState } from "react";
import ListPostsFilter from "../ListPostsFilter";
import LoadPostsList from "./loadPostsList";
import './index.scss';

const serverURL = process.env.REACT_APP_BE_URL;
const showPostAPI = process.env.REACT_APP_View_Post;

const ListPosts = ({passedQuery}) => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState(passedQuery);

  useEffect(() => {
    axios.get(serverURL + showPostAPI, { params: { ...query } })
      .then(res => {console.log(res); setPosts(res.data.posts)})
  }, [query]);

  return (
    <div className='ListPosts'>
      <ListPostsFilter setQuery={setQuery} />
      <LoadPostsList posts={posts} />
    </div>
  );
}

export default ListPosts;