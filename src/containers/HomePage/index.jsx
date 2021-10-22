import React from "react";
import { ListPosts } from "../../components";
// import { useHistory } from "react-router";

const HomePage = ({query, setQuery}) => {
  // const history = useHistory();
  
  return (
    <div>
      <ListPosts passedQuery={query} setPassedQuery={setQuery} />
    </div>
  );
}

export default HomePage;