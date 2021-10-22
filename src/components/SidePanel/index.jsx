import React from "react";
import { Link, useRouteMatch } from 'react-router-dom';
import './index.scss';

const SidePanel = props => {
  const routeMatch = useRouteMatch();
  
  const similarPosts = obj => props.setQuery(obj);

  return (
    <div className='SidePanel'>
      {
        routeMatch.path === '/viewPost/:id' ?
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