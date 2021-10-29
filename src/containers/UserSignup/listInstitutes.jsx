import React, { useEffect, useState } from "react";

const ListInstitutes = props => {
  const [typedInstitute, setTypedInstitute] = useState('');
  const [filteredInstitutes, setFilteredInstitutes] = useState([]);

  useEffect(() => setTypedInstitute(props.institute.name || '')
  , [props.institute.name]);

  const handleInstituteFieldChange = e => {
    props.setInstitute({});
    setTypedInstitute(e.target.value);
    if(e.target.value.length) {
      setFilteredInstitutes(props.institutesList.filter((institute) =>
        institute.name.toUpperCase().search(e.target.value.toUpperCase()) !== -1)
      );
    } else {
      setFilteredInstitutes([]);
    }
  }

  const setInstituteHandle = institute => {
    props.setInstitute(institute);
    setTypedInstitute(institute.name);
    setFilteredInstitutes([]);
  }

  const RenderDropdownList = () => {
    if(!Object.keys(props.institute).length && typedInstitute.length) {
      return (
        <div className='listing-dropdown institutesListing'>
          <ul>
            <li onClick={() => setInstituteHandle({ name: typedInstitute, branches: [] })}>
              <i>Add "{typedInstitute}"</i>
            </li>
            {
              filteredInstitutes.map((institute, index) =>
                <li key={index} onClick={() => setInstituteHandle(institute)}>{institute.name}</li>
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
      <label htmlFor='institute'>Institute</label>
      <input type='text' name='institute' value={typedInstitute} onChange={handleInstituteFieldChange} autoComplete='off' />

      <RenderDropdownList />
    </div>
  );
}

export default ListInstitutes;