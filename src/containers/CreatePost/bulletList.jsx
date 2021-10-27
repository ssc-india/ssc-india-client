import React from "react";

const BulletList = props => {
  console.log(props.contents);
  const lines = props.contents.map((line, index) =>
    <li key={index}>
      <input type='text' value={line} onChange={e => props.editBulletListLine(index, e.target.value)} />
      <button onClick={() => props.removeLine(index)}>Remove line</button>
    </li>
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