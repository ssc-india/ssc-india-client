import axios from "axios";
import React, { useEffect, useState } from "react";
import ListPostsFilter from "../ListPostsFilter";
import LoadPostsList from "./loadPostsList";
import './index.scss';
import { ErrorMessages } from "..";

const serverURL = process.env.REACT_APP_BE_URL;
const showPostAPI = process.env.REACT_APP_View_Post;

const ListPosts = ({passedQuery}) => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState(passedQuery);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    axios.get(serverURL + showPostAPI, { params: { ...query } })
      .then(res => setPosts(res.data.posts))
      .catch(({response}) => setErrorMessages(response.data.errors))
  }, [query]);

  return (
    <div className='ListPosts'>
      {
        errorMessages.length ?
        <ErrorMessages errors={errorMessages} /> :
        null
      }

      <ListPostsFilter query={query} setQuery={setQuery} />
      <LoadPostsList posts={posts} />
    </div>
  );
}

export default ListPosts;