import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import RenderPostContents from './renderContents';

const serverURL = process.env.REACT_APP_BE_URL || '';
const BlogUploadAPI = process.env.REACT_APP_Create_Post || '';

const CreatePost = props => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState([{ type: 'p' }]);
  const [addElement, setAddElement] = useState('');
  const [generic, setGeneric] = useState(false);
  const history = useHistory();

  const handleContentsChange = (index, obj) => setContents([
    ...contents.slice(0, index),
    { ...contents[index], ...obj },
    ...contents.slice(index+1)
  ]);

  const addNewElement = e => {
    let newEl = {};
    if(e.target.value === 'p') {
      newEl = { type: 'p', content: '' };
    } else if(e.target.value === 'img') {
      newEl = { type: 'img', src: '', description: '' };
    }
    setContents([...contents, newEl]);
    setAddElement('');
  }

  const removeElement = index => setContents([...contents.slice(0, index), ...contents.slice(index+1)]);

  var canSubmit = title.length > 0 && contents.length > 0;
  if(canSubmit) {
    for(const el of contents) {
      if(!('content' in el && el.content.length > 0) && !('src' in el && el.src.length > 0)) {
        canSubmit = false;
      }
    }
  }

  const handleSubmit = () => {
    if(canSubmit) {
      axios.post(serverURL + BlogUploadAPI,
        {
          title: title,
          content: contents,
          insitute: props.insitute,
          branch: props.branch,
          tag: generic ? 'generic' : 'blog',
        }
      ).then(() => history.push(''))
      .catch(({response}) => response.status === 400 ? props.setUser({}) : null);
    }
  }

  return (
    <div>
      <div>
        <label htmlFor='blog-title'>Title</label>
        <input type='text' id='blog-title' name='blog-title'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='generic'>Generic post</label>
        <input type='radio' name='generic' checked={generic} onChange={() => setGeneric(true)} />
        <label htmlFor='blog'>Blog post</label>
        <input type='radio' name='blog' checked={!generic} onChange={() => setGeneric(false)} />
      </div>
      <div>
        <RenderPostContents
          contents={contents}
          handleContentsChange={handleContentsChange}
          removeElement={removeElement}
        />
      </div>
      <select value={addElement} onChange={addNewElement}>
        <option value='' disabled selected>Add Element</option>
        <option value='p'>Paragraph</option>
        <option value='img'>Image</option>
      </select>
      <button type='submit' onClick={handleSubmit} disabled={!canSubmit}>Submit</button>
    </div>
  );
}

export default CreatePost;