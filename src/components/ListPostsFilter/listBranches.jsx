import React from "react";

const ListBranches = props => {
  const renderBranchesList = [...props.branches].map((branch, index) =>
    <option key={index} value={branch}>{branch}</option>
  );

  return (
    <div>
      <label htmlFor='branch'>Branch</label>
      <select name='branch' value={props.filter.branch}
        onChange={e => props.filterChange({ branch: e.target.value })}
      >
        <option value='' selected>All</option>
        {renderBranchesList}
      </select>
    </div>
  );
}

export default ListBranches;