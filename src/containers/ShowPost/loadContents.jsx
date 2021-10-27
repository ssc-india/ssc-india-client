import React from "react";

const LoadPostContents = props =>
  props.contents ?
    props.contents.map((el, index) => {
      if(el.type === 'p') {
        return (
          <div key={index}>
            <p>{el.content}</p>
          </div>
        );
      } else if(el.type === 'img') {
        return (
          <div key={index} className='postImg'>
            <img src={el.src} alt={el.description} />
            <p><i>{el.description}</i></p>
          </div>
        );
      } else if(el.type === 'ul') {
        return (
          <div key={index}>
            <ul>
              {
                el.contents.map((line, lineIndex) =>
                  <li key={lineIndex}>{line}</li>)
              }
            </ul>
          </div>
        );
      } else if(el.type === 'h2') {
        return (
          <div key={index}>
            <h2>{el.text}</h2>
          </div>
        );
      } else if(el.type === 'hr') {
        return (
          <div key={index}>
            <hr />
          </div>
        );
      }
      return null;
    }) :
    null;

export default LoadPostContents;