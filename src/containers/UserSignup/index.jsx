import axios from "axios";
import React, { useState } from "react";
import './index.scss';

const serverURL = process.env.REACT_APP_BE_URL || '';
const SignupUserAPI = process.env.REACT_APP_Signup_User || '';
const CheckUsernameAPI = process.env.REACT_APP_Check_Username || '';

const UserSignup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [institute, setInstitute] = useState('');
  const [branch, setBranch] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyUsername, setVerifyUsername] = useState('not verified');
  const [userCreated, setUserCreated] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const submit = () => {
    setUserCreated({});
    setErrorMessage(null);

    axios.post(serverURL + SignupUserAPI,
      {
        name: name,
        username: username,
        institute: institute,
        branch: branch,
        email: email,
        password: password
      },
      { withCredentials: true }
    ).then(() => {
      setUserCreated({
        username: username,
        email: email,
        password: password
      });
      setName('');
      setUsername('');
      setInstitute('');
      setBranch('');
      setEmail('');
      setPassword('');
      setVerifyUsername('not verified');
    }).catch(({response}) => setErrorMessage(response.data.errors[0].message));
  }

  const checkUsernameUniqueness = () => {
    setVerifyUsername('verifying');
    axios.post(serverURL + CheckUsernameAPI,
      { username: username }
    ).then(() => {
      setVerifyUsername('verified');
      setErrorMessage(null);
    }).catch(({response}) => {
      setErrorMessage(response.data.errors[0].message);
      setVerifyUsername('not verified');
    });
  }
  
  return (
    <div className="Signup">
      {
        'email' in userCreated ?
          <div className='userCreated'>
            <p>
              User email verification pending. Please check your inbox (and spam) for the verification link.
            </p><br />
            <div>
              <label htmlFor='createdUsername'>Username</label>
              <p name='createdUsername'>{userCreated.username}</p>
            </div>
            <div>
              <label htmlFor='createdEmail'>Email</label>
              <p name='createdEmail'>{userCreated.email}</p>
            </div>
            <div>
              <label htmlFor='createdPass'>Password</label>
              <p name='createdPass'>{userCreated.password}</p>
            </div>
          </div> :
          null
      }

      {
        errorMessage ?
          <div className='error'>
            <p>Failed; {errorMessage}</p>
          </div> :
          null
      }

      <div>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' value={username}
          onChange={e => {setUsername(e.target.value); setVerifyUsername('not verified');}}
        />
        {
          verifyUsername === 'verified' ?
          <span><i>Unique</i></span> :
          <button onClick={checkUsernameUniqueness} disabled={verifyUsername === 'verifying'}>
            {verifyUsername === 'not verified' ? 'Verify uniqueness' : 'Verifying'}
          </button>
        }
      </div>

      <div>
        <label htmlFor='institute'>Institute</label>
        <input type='text' name='institute' value={institute} onChange={e => setInstitute(e.target.value)} />
      </div>

      <div>
        <label htmlFor='branch'>Branch</label>
        <input type='text' name='branch' value={branch} onChange={e => setBranch(e.target.value)} />
      </div>

      <div>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div>
        <label htmlFor='password'>Password (min 8 chars)</label>
        <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
      </div>

      <button onClick={submit} disabled={password.length < 8}>Register</button>
    </div>
  );
}

export default UserSignup;