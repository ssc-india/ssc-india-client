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
          <div key={index}>
            <img src={el.src} alt={el.description} />
            <p>{el.description}</p>
          </div>
        );
      }
      return null;
    }) :
    null;

export default LoadPostContents;