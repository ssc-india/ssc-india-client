import React, { useState } from "react";
import './index.scss';
import ListInstitutes from "./listInstitutes";

const ListPostsFilter = props => {
  const [filter, setFilter] = useState({ tag: '', institute: '', branch: '' });

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

      <ListInstitutes filter={filter} filterChange={filterChange} />

      <div>
        <label htmlFor='branch'>Branch</label>
        <select name='branch' value={filter.branch}
          onChange={e => filterChange({ branch: e.target.value })} disabled
        >
          <option value='' selected>All</option>
        </select>
      </div>
    </div>
  );
}

export default ListPostsFilter;