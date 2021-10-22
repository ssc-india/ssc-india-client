import React from "react";
import { Link, useHistory, useLocation } from 'react-router-dom';
import './index.scss';

const SidePanel = props => {
  const location = useLocation();
  const history = useHistory();
  
  const similarPosts = obj => {
    props.setQuery(obj);
    history.push('/');
  }

  return (
    <div className='SidePanel'>
      {
        location.pathname.slice(0, location.pathname.lastIndexOf('/')) ?
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