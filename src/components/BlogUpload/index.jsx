import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const BlogUploadAPI = process.env.REACT_APP_Blog_Upload || '';

const BlogUpload = props => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState([{ type: 'p' }]);
  const [addElement, setAddElement] = useState('');
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

  var canSubmit = title.length > 0;
  if(canSubmit) {
    for(const el of contents) {
      if(!('content' in el && el.content.length > 0) && !('src' in el && el.src.length > 0)) {
        canSubmit = false;
      }
    }
  }

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

  const renderContents = () =>
    contents.map((el, index) => {
      if(el.type === 'p') {
        return (
          <div key={index}>
            <button onClick={() => removeElement(index)}>Remove</button>
            <input type='text' value={el.content}
              onChange={e => handleContentsChange(index, { content: e.target.value })}
              required
            />
          </div>
        );
      } else if(el.type === 'img') {
        return (
          <div key={index}>
            <button onClick={() => removeElement(index)}>Remove</button>
            <p><i>
              [Please host the images somewhere online 
              (like <a href='https://imgur.com/upload'>https://imgur.com/upload</a>)
              and provide link here. The link will not be visible to readers once post is ready.]
            </i></p>
            <label htmlFor='src'>URL</label>
            <input type='text' name='src' value={el.src}
              onChange={e => handleContentsChange(index, { src: e.target.value })}
            />
            <img src={el.src} alt={el.description} />
            <label htmlFor='description'>Image description</label>
            <input type='text' name='description' value={el.description}
              onChange={e => handleContentsChange(index, { description: e.target.value })}
            />
          </div>
        );
      }
      return null;
    });

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
      <div>{`{add main image optional}`}</div>
      <div>
        {renderContents()}
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

export default BlogUpload;