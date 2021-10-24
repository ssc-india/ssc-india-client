import React from "react";

const BulletList = props => {
  console.log(props.contents);
  const lines = props.contents.map((line, index) =>
    <li key={index}>{line} <button onClick={() => props.removeLine(index)}>Remove line</button></li>
  );
  
  return (
    <div>
      <ul>
        {lines}
      </ul>
      <button onClick={props.addLine}>Add line</button>
    </div>
  );
}

export default BulletList;