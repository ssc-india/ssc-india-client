import React from "react";
import BulletList from "./bulletList";
import './index.scss';

const RenderPostContents = props =>
  props.contents.map((el, index) => {
    if(el.type === 'p') {
      return (
        <div key={index}>
          <button className='removeButton' onClick={() => props.removeElement(index)}>Remove</button>

          <div>
            <label htmlFor='paragraph'>Text</label>
            <textarea type='text' name='paragraph' value={el.content}
              onChange={e => props.handleContentsChange(index, { content: e.target.value })}
              required
            />
          </div>
        </div>
      );
    } else if(el.type === 'img') {
      return (
        <div key={index} className='AddImg'>
          <button className='removeButton' onClick={() => props.removeElement(index)}>Remove</button>

          <p><i>
            [Please host the images somewhere online 
            (like<a href='https://imgur.com/upload' target='_blank' rel='noopener noreferrer'>https://imgur.com/upload</a>)
            and provide link here. The link will not be visible to readers once post is ready.]
          </i></p>

          <div className='imgInput'>
            <label htmlFor='src'>URL</label>
            <input type='text' name='src' value={el.src}
              onChange={e => props.handleContentsChange(index, { src: e.target.value })}
            />
          </div>

          <img src={el.src} alt={el.description} />

          <div className='imgShow'>
            <label htmlFor='description'>Image description</label>
            <input type='text' name='description' value={el.description}
              onChange={e => props.handleContentsChange(index, { description: e.target.value })}
            />
          </div>
        </div>
      );
    } else if(el.type === 'ul') {
      return (
        <div>
          <button className='removeButton' onClick={() => props.removeElement(index)}>Remove</button>

          <BulletList
            contents={el.contents}
            addLine={() => props.addBulletListLine(index)}
            removeLine={(lineIndex) => props.removeBulletListLine(index, lineIndex)}
            editBulletListLine={(lineIndex, line) => props.editBulletListLine(index, lineIndex, line)}
          />
        </div>
      );
    } else if(el.type === 'h2') {
      return (
        <div>
          <button className='removeButton' onClick={() => props.removeElement(index)}>Remove</button>

          <div>
            <label htmlFor='heading'>Heading</label>
            <input type='text' name='heading' value={el.text} className='blog-heading'
              onChange={e => props.handleContentsChange(index, { text: e.target.value })}
            />
          </div>
        </div>
      );
    } else if(el.type === 'hr') {
      return (
        <div>
          <button className='removeButton' onClick={() => props.removeElement(index)}>Remove</button>
          <hr />
        </div>
      );
    }
    return null;
  });

export default RenderPostContents;