import axios from "axios";
import React, { useEffect, useState } from "react";

const serverURL = process.env.REACT_APP_BE_URL || '';
const ListInstitutesAPI = process.env.REACT_APP_List_Institutes || '';

const ListInstitutes = props => {
  const [institutes, setInstitutes] = useState([]);

  useEffect(() =>
    axios.get(serverURL + ListInstitutesAPI)
      .then(res => setInstitutes(res.data))
  , []);

  const renderInstitutesList = institutes.map((institute, index) =>
    <option key={index} value={institute.name}>{institute.name}</option>
  );

  return (
    <div>
      <label htmlFor='institute'>Institute</label>
      <select name='institute' value={props.filter.institute}
        onChange={e => props.filterChange({ institute: e.target.value })}
      >
        <option value='' selected>All</option>
        {renderInstitutesList}
      </select>
    </div>
  );
}

export default ListInstitutes;