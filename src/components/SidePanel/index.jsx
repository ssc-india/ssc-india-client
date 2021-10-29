import React from "react";
import { useHistory, useLocation } from 'react-router-dom';
import ls from 'local-storage';
import './index.scss';

const SidePanel = props => {
  const location = useLocation();
  const history = useHistory();
  
  const similarPosts = obj => {
    props.setQuery(obj);
    history.push('/');
  }

  const renderDrafts = () => {
    let drafts = ls.get('drafts') || [];
    return drafts.map((draft, index) =>
      <li key={index} onClick={() => {
        props.setDraftId(index);
        history.push('/createPost');
      }}>
        {draft.title}
      </li>);
  }

  return (
    <div className='SidePanel'>
      {
        location.pathname.slice(0, location.pathname.lastIndexOf('/')) === '/viewPost' ?
          <div className='sideLinks'>
            <button onClick={() => similarPosts({  })}>HomePage</button>
            <button onClick={() => similarPosts({ institute: props.similarQuery.institute || '' })}>Posts from this institute</button>
            <button onClick={() => similarPosts({ branch: props.similarQuery.branch || '' })}>Posts from this branch</button>
          </div> :
          null
      }

      <div>
        <h5>Important Notifications</h5>
      </div>

      <div>
        <h5>Your saved drafts</h5>
        <ul>
          {renderDrafts()}
        </ul>
      </div>
    </div>
  );
}

export default SidePanel;