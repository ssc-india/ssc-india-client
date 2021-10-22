import React, { useState } from "react";
import './index.scss';

const ListPostsFilter = props => {
  const [filter, setFilter] = useState({ tag: '', institute: '', branch: '' });

  const filterChange = obj => {
    setFilter({ ...filter, ...obj });
    props.setQuery(filter);
  };

  return (
    <div className='ListPostsFilter'>
      <label htmlFor='tag'>Posts</label>
      <select name='tag' value={filter.tag} onChange={e => filterChange({ tag: e.target.value })}>
        <option value='' selected>All</option>
        <option value='generic'>Info</option>
        <option value='blog'>Blog</option>
      </select>

      <label htmlFor='institute'>Institute</label>
      <select name='institute' value={filter.institute} onChange={e => filterChange({ institute: e.target.value })}>
        <option value='' selected>All</option>
      </select>

      <label htmlFor='branch'>Branch</label>
      <select name='branch' value={filter.branch} onChange={e => filterChange({ branch: e.target.value })}>
        <option value='' selected>All</option>
      </select>
    </div>
  );
}

export default ListPostsFilter;