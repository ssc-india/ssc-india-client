import React from "react";

const RenderPostContents = props =>
  props.contents.map((el, index) => {
    if(el.type === 'p') {
      return (
        <div key={index}>
          <button onClick={() => props.removeElement(index)}>Remove</button>
          <input type='text' value={el.content}
            onChange={e => props.handleContentsChange(index, { content: e.target.value })}
            required
          />
        </div>
      );
    } else if(el.type === 'img') {
      return (
        <div key={index}>
          <button onClick={() => props.removeElement(index)}>Remove</button>

          <p><i>
            [Please host the images somewhere online 
            (like <a href='https://imgur.com/upload'>https://imgur.com/upload</a>)
            and provide link here. The link will not be visible to readers once post is ready.]
          </i></p>

          <label htmlFor='src'>URL</label>
          <input type='text' name='src' value={el.src}
            onChange={e => props.handleContentsChange(index, { src: e.target.value })}
          />

          <img src={el.src} alt={el.description} />
          <label htmlFor='description'>Image description</label>
          <input type='text' name='description' value={el.description}
            onChange={e => props.handleContentsChange(index, { description: e.target.value })}
          />
        </div>
      );
    }
    return null;
  });

export default RenderPostContents;