import React from "react";
import './index.scss';

const DeleteModal = props => {
  return (
    <div className='DeleteModal'>
      <div className='DeleteModalBg' />
      <div className='DeleteModalContainer'>
        <p>Delete this post? This action is irreversible.</p>
        <div className='buttonsContainer'>
          <button onClick={props.confirmDelete}>Delete</button>
          <button onClick={props.cancelDelete}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;