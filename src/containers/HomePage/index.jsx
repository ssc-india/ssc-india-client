import React, { useEffect } from "react";
import { ListPosts } from "../../components";

const HomePage = props => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => props.setPost([]), []);

  return (
    <div>
      <ListPosts passedQuery={props.query} />
    </div>
  );
}

export default HomePage;