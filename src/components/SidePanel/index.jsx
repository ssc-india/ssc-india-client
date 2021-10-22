import React from "react";
import { Link, useRouteMatch } from 'react-router-dom';
import './index.scss';

const SidePanel = props => {
  const routeMatch = useRouteMatch();
  console.log(routeMatch);  // TEST THIS
  
  const similarPosts = obj => props.setQuery(obj);

  return (
    <div className='SidePanel'>
      {
        ['/viewPost/:id', '/createPost'].includes(routeMatch.path) ?
          <div>
            <Link to='/'>HomePage</Link>
            <button onClick={() => similarPosts({ institute: props.query.institute || '' })}>Posts from this institute</button>
          </div> :
          null
      }
      <div>
        <h5>Important Notifications</h5>
      </div>
    </div>
  );
}

export default SidePanel;