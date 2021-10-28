import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";

const serverURL = process.env.REACT_APP_BE_URL || '';
const AuthenticateUserAPI = process.env.REACT_APP_Auth_User || '';

const AuthenticateUser = ({ setUser }) => {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [loginFail, setLoginFail] = useState(false);
  const history = useHistory();

  const login = () =>
    axios.post(serverURL + AuthenticateUserAPI,
      { identity: identity, password: password },
      { withCredentials: true }
    ).then(res => {
      if(res.status === 200) {
        setUser(res.data);
        history.push('/');
      }
    }).catch(({ response }) => {
      if(response.status === 400) {
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
        <label htmlFor='identity'>Email or username</label>
        <input type='text' name='identity' id='identity'
          onChange={e => setIdentity(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password'
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>

      <button type='submit' onClick={login} disabled={identity.length*password.length === 0}>
        Login
      </button>

      <button onClick={() => history.push('/userSignup')}>Sign up</button>
    </div>
  );
}

export default AuthenticateUser;
