import axios from "axios";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import DeleteModal from "../../modals/DeleteModal";
import './index.scss';

const serverURL = process.env.REACT_APP_BE_URL;
const deletePostAPI = process.env.REACT_APP_Delete_Post;

const Navbar = props => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const deletePost = postId =>
    axios.post(serverURL + deletePostAPI,
      { postId: postId },
      { withCredentials: true }
    ).then(() => {
      setDeleteModalVisible(false);
      history.push('/');
    })
    .catch(err => console.log(err));

  return (
    <div className='Navbar-container'>
      <button onClick={() => history.goBack()} disabled={location.pathname === '/'}>Back</button>

      {
        props.user.name ?
          <p>Signed in as {props.user.name}</p> :
          null
      }

      {
        props.user.name ?
          <button onClick={() => history.push('/createPost')}>Create Post</button> :
          null
      }

      {
        props.user.name &&
        location.pathname.slice(0, location.pathname.lastIndexOf('/')) === '/viewPost' ?
          <button onClick={() => history.push('/editPost/' + props.postId)}>Edit Post</button> :
          null
      }

      {
        props.user.name &&
        location.pathname.slice(0, location.pathname.lastIndexOf('/')) === '/viewPost' &&
        props.user.id === props.postAuthor ?
          <button onClick={() => setDeleteModalVisible(true)}>Delete Post</button> :
          null
      }

      {
        deleteModalVisible?
          <DeleteModal
            confirmDelete={() => deletePost(props.postId)}
            cancelDelete={() => setDeleteModalVisible(false)}
          /> :
          null
      }

      <button onClick={props.setUser}>
        { props.user.name ? 'Sign out' : 'Sign in' }
      </button>
    </div>
  );
}

export default Navbar;