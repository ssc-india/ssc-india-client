import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const BlogUploadAPI = process.env.REACT_APP_Blog_Upload || '';

const BlogUpload = props => {
  const [contents, setContents] = useState({});
  const history = useHistory();

  const handleContentsChange = ({content}) => setContents({...contents, content});

  const canSubmit = 'title' in contents && 'content0' in contents;

  const handleSubmit = () => {
    if(canSubmit) {
      axios.post(BlogUploadAPI,
        {
          ...contents,
          time: Date(),
          author: props.user,
        }
      ).then(() => history.push(''));
    }
  }

  return (
    <div>
      <div>
        <label htmlFor='blog-title'>Title</label>
        <input type='text' id='blog-title' name='blog-title'
          onChange={e => handleContentsChange({ title: e.target.value })}
          required
        />
      </div>
      <div>{`{add main image optional}`}</div>
      <div>
        <label htmlFor='blog-content0'>Contents</label>
        <input type='blog-content0' id='blog-content0' name='blog-content0'
          onChange={e => handleContentsChange({ content0: e.target.value })}
          required
        />
      </div>
      <button type='submit' onClick={handleSubmit} disabled={!canSubmit}>Submit</button>
    </div>
  );
}

export default BlogUpload;