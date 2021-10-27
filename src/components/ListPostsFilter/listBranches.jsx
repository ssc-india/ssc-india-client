import React from "react";

const ListBranches = props => {
  const renderBranchesList = [...props.branches].map((branch, index) =>
    <option key={index} value={branch}
      selected={props.filter.branch === branch}
    >
      {branch}
    </option>
  );

  return (
    <div>
      <label htmlFor='branch'>Branch</label>
      <select name='branch' value={props.filter.branch}
        onChange={e => props.filterChange({ branch: e.target.value })}
      >
        <option value='' selected={props.filter.branch === ''}>All</option>
        {renderBranchesList}
      </select>
    </div>
  );
}

export default ListBranches;