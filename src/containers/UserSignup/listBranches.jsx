import React, { useEffect, useState } from "react";

const ListBranches = props => {
  const [typedBranch, setTypedBranch] = useState('');
  const [filteredBranches, setFilteredBranches] = useState([]);

  useEffect(() => setTypedBranch(props.branch)
  , [props.branch]);

  const handleBranchFieldChange = e => {
    props.setBranch('');
    setTypedBranch(e.target.value);
    if(e.target.value.length) {
      setFilteredBranches(props.branchesList.filter((branch) =>
        branch.name.toUpperCase().search(e.target.value.toUpperCase()) !== -1)
      );
    } else {
      setFilteredBranches([]);
    }
  }

  const setBranchHandle = branch => {
    props.setBranch(branch);
    setTypedBranch(branch);
    setFilteredBranches([]);
  }

  const RenderDropdownList = () => {
    if(!props.branch.length && typedBranch.length) {
      return (
        <div className='listing-dropdown branchesListing'>
          <ul>
            <li onClick={() => setBranchHandle(typedBranch)}>
              <i>Add "{typedBranch}"</i>
            </li>
            {
              filteredBranches.map((branch, index) =>
                <li key={index} onClick={() => setBranchHandle(branch.name)}>{branch.name}</li>
              )
            }
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <div>
      <label htmlFor='branch'>Branch</label>
      <input type='text' name='branch' value={typedBranch} onChange={handleBranchFieldChange}
        disabled={props.disabled}
      />

      <RenderDropdownList />
    </div>
  );
}

export default ListBranches;