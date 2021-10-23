import React, { useState } from "react";
import ListBranches from "./listBranches";
import ListInstitutes from "./listInstitutes";
import './index.scss';

const ListPostsFilter = props => {
  const [filter, setFilter] = useState({ tag: '', institute: '', branch: '' });
  const [branches, setBranches] = useState(new Set());

  const filterChange = obj => {
    setFilter({ ...filter, ...obj });
    props.setQuery({ ...filter, ...obj });
  };

  return (
    <div className='ListPostsFilter'>
      <div>
        <label htmlFor='tag'>Posts</label>
        <select name='tag' value={filter.tag}
          onChange={e => filterChange({ tag: e.target.value })}
        >
          <option value='' selected>All</option>
          <option value='generic'>Info</option>
          <option value='blog'>Blog</option>
        </select>
      </div>

      <ListInstitutes filter={filter} filterChange={filterChange} setBranches={setBranches} />

      <ListBranches filter={filter} filterChange={filterChange} branches={branches} />

      {/* <button onClick={() => {setFilter({}); props.setQuery({})}}>Clear filter</button> */}
    </div>
  );
}

export default ListPostsFilter;