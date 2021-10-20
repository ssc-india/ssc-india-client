import React, { useState } from 'react';
import axios from 'axios';

const DevTest = () => {
  const [fields, setFields] = useState({});

  const handleFieldChange = field => setFields({ ...fields, ...field });

  const submit = () =>
    axios.post('http://localhost:5000/auth/signup',
      fields
    ).then(res => { return res });
  
  return (
    <div>
      <div>
        <label for="name">Name</label>
        <input type="text" name="name" id="name" onChange={e => handleFieldChange({ name: e.target.value })} />
      </div>
      <div>
        <label for="institute">Institute</label>
        <input type="text" name="institute" id="institute" onChange={e => handleFieldChange({ institute: e.target.value })} />
      </div>
      <div>
        <label for="branch">Branch</label>
        <input type="text" name="branch" id="branch" onChange={e => handleFieldChange({ branch: e.target.value })} />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" onChange={e => handleFieldChange({ email: e.target.value })} />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" onChange={e => handleFieldChange({ password: e.target.value })} />
      </div>
      <input type="submit" value="Submit" onClick={submit} />
    </div>
  );
}

export default DevTest;