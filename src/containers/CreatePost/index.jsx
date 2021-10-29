import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ls from 'local-storage';
import { ErrorMessages } from '../../components';
import RenderPostContents from './renderContents';
import './index.scss';

const serverURL = process.env.REACT_APP_BE_URL || '';
const PostUploadAPI = process.env.REACT_APP_Create_Post || '';
const PostEditAPI = process.env.REACT_APP_Edit_Post || '';

const CreatePost = props => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState([{ type: 'p' }]);
  const [generic, setGeneric] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if(props.edit) {
      setTitle(props.post.title);
      setContents(props.post.content);
      setGeneric(props.post.tag === 'generic');
    }
  }, [props.edit, props.post]);

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
    } else if(e.target.value === 'ul') {
      newEl = { type: 'ul', contents: [''] };
    } else if(e.target.value === 'h2') {
      newEl = { type: 'h2', text: '' }
    } else if(e.target.value === 'hr') {
      newEl = { type: 'hr' }
    }
    setContents([...contents, newEl]);
  }

  const removeElement = index =>
    setContents([
      ...contents.slice(0, index),
      ...contents.slice(index+1)
    ]);

  var canSubmit = title.length > 0 && contents.length > 0;
  if(canSubmit) {
    for(const el of contents) {
      if(('content' in el && el.content.length === 0) || ('src' in el && el.src.length === 0)) {
        canSubmit = false;
      }
    }
  }

  const handleSubmit = () => {
    if(canSubmit) {
      if(props.edit) {
        axios.post(serverURL + PostEditAPI,
          {
            postId: props.id,
            content: contents
          },
          { withCredentials: true }
        ).then(() => history.push('/viewPost/' + props.id))
        .catch(({response}) => setErrorMessages(response.data.errors));
      } else {
        axios.post(serverURL + PostUploadAPI,
          {
            title: title,
            content: contents,
            institute: props.user.institute,
            branch: props.user.branch,
            tag: generic ? 'generic' : 'blog',
          },
          { withCredentials: true }
        ).then(res => history.push('/viewPost/' + res.data.postId))
        .catch(({response}) => {
          if(response.status === 400) {
            setErrorMessages(response.data.errors);
            props.setUser({});
          }
        });
      }
    }
  }

  const saveAsDraft = draftId => {
    let drafts = ls.get('drafts') || [];
    const obj = {
      title: title,
      content: contents,
      institute: props.user.institute,
      branch: props.user.branch,
      tag: generic ? 'generic' : 'blog',
    };
    if(draftId) {
      drafts[draftId] = obj;
    } else {
      drafts.push(obj);
    }
    ls.set('drafts', drafts);
    props.setDraftId(draftId || drafts.length-1)
  }

  return (
    <div className='createPost'>
      {
        errorMessages.length ?
        <ErrorMessages errors={errorMessages} /> :
        null
      }

      <div className='titlearea'>
        <label htmlFor='blog-title'>Title</label>
        <input type='text' id='blog-title' name='blog-title' className='blog-heading'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          disabled={props.edit}
        />
      </div>

      {
        !props.edit ?
          <div>
            <p>Post type:</p>
            <div className='radioGroup'>
              <label htmlFor='generic'>Factual post</label>
              <input type='radio' name='generic' checked={generic} onChange={() => setGeneric(true)} />
              <label htmlFor='blog'>Blog post</label>
              <input type='radio' name='blog' checked={!generic} onChange={() => setGeneric(false)} />
            </div>
          </div> :
          null
      }

      <div>
        <hr />
      </div>

      <div>
        <RenderPostContents
          contents={contents}
          handleContentsChange={handleContentsChange}
          removeElement={removeElement}
          addBulletListLine={index => setContents([
            ...contents.slice(0, index),
            {
              ...contents[index],
              contents: [...contents[index].contents, '']
            },
            ...contents.slice(index+1)
          ])}
          removeBulletListLine={(index, lineIndex) => setContents([
            ...contents.slice(0, index),
            {
              ...contents[index],
              contents: [
                ...contents[index].contents.slice(0, lineIndex),
                ...contents[index].contents.slice(lineIndex+1),
              ]
            },
            ...contents.slice(index+1)
          ])}
          editBulletListLine={(index, lineIndex, line) => setContents([
            ...contents.slice(0, index),
            {
              ...contents[index],
              contents: [
                ...contents[index].contents.slice(0, lineIndex),
                line,
                ...contents[index].contents.slice(lineIndex+1)
              ]
            },
            ...contents.slice(index+1)
          ])}
        />
      </div>

      <div className='buttonGroup'>
        <select value='' onChange={addNewElement}>
          <option value='' disabled selected>Add Element</option>
          <option value='h2'>Subheading</option>
          <option value='hr'>Horizontal Line</option>
          <option value='p'>Paragraph</option>
          <option value='img'>Image</option>
          <option value='ul'>Bullet List</option>
        </select>

        <button onClick={handleSubmit} disabled={!canSubmit}>Submit</button>
        <button onClick={() => saveAsDraft(props.draftId)}>Save as draft</button>
      </div>
    </div>
  );
}

export default CreatePost;