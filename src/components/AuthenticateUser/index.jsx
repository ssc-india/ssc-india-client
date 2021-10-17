import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";

const AuthenticateUserAPI = process.env.REACT_APP_Authenticate_User_API || '';

const AuthenticateUser = ({ setUser }) => {
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [loginFail, setLoginFail] = useState(false);
  const history = useHistory();

  const login = () =>
    axios.post(AuthenticateUserAPI,
      { name: name, key: key }
    ).then(res => {
      if(res.status === 'success') {
        setUser(name);
        history.push('/');
      } else {
        setLoginFail(true);
      }
    });

  return (
    <div>
      {
        loginFail ?
          <div>
            Login failed
          </div> :
          null
      }
      <div>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' id='username'
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password'
          onChange={e => setKey(e.target.value)}
          required
        />
      </div>
      <button type='submit' onClick={login} disabled={name.length*key.length === 0}>
        Login
      </button>
    </div>
  );
}

export default AuthenticateUser;