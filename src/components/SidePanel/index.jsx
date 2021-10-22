import React from "react";
import { Link } from 'react-router-dom';

const SidePanel = props => {
  const similarPosts = obj => props.setQuery(obj);

  return (
    <div className='SidePanel'>
      <Link to='/'>HomePage</Link>
      <button onClick={() => similarPosts({ institute: props.query.institute || '' })}>Posts from this institute</button>
    </div>
  );
}

export default SidePanel;