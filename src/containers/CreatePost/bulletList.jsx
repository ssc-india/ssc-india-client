import React from "react";

const BulletList = props => {
  const lines = props.contents.map((line, index) =>
    <li key={index}>
      <textarea type='text' value={line} onChange={e => props.editBulletListLine(index, e.target.value)} />
      <button onClick={() => props.removeLine(index)}>Remove line</button>
    </li>
  );
  
  return (
    <div className='bulletList'>
      <ul>
        {lines}
      </ul>
      <button onClick={props.addLine}>Add line</button>
    </div>
  );
}

export default BulletList;