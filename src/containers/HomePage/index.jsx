import React from "react";
import { ListPosts } from "../../components";

const HomePage = ({query}) => {
  return (
    <div>
      <ListPosts passedQuery={query} />
    </div>
  );
}

export default HomePage;