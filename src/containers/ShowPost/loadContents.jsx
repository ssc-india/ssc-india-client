import React from "react";

const LoadPostContents = props =>
  props.contents ?
    props.contents.map((el, index) => {
      if(el.type === 'p') {
        return (
          <div key={index}>
            <p>{el.content}</p>
            <hr />
          </div>
        );
      } else if(el.type === 'img') {
        return (
          <div key={index} className='postImg'>
            <img src={el.src} alt={el.description} />
            <p><i>{el.description}</i></p>
            <hr />
          </div>
        );
      }
      return null;
    }) :
    null;

export default LoadPostContents;