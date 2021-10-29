import axios from "axios";
import React, { useEffect, useState } from "react";
import { ErrorMessages } from "../../components";
import './index.scss';
import ListBranches from "./listBranches";
import ListInstitutes from "./listInstitutes";

const serverURL = process.env.REACT_APP_BE_URL || '';
const SignupUserAPI = process.env.REACT_APP_Signup_User || '';
const CheckUsernameAPI = process.env.REACT_APP_Check_Username || '';
const ListInstitutesAPI = process.env.REACT_APP_List_Institutes || '';

const UserSignup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [institute, setInstitute] = useState({});
  const [institutesList, setInstitutesList] = useState([]);
  const [branch, setBranch] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyUsername, setVerifyUsername] = useState('not verified');
  const [userCreated, setUserCreated] = useState({});
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() =>
    axios.get(serverURL + ListInstitutesAPI)
      .then(res => {
        setInstitutesList(res.data);
      })
  , []);

  const submit = () => {
    setUserCreated({});
    setErrorMessages([]);

    axios.post(serverURL + SignupUserAPI,
      {
        name: name,
        username: username,
        institute: institute.name,
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
      setInstitute({});
      setBranch('');
      setEmail('');
      setPassword('');
      setVerifyUsername('not verified');
    }).catch(({response}) => setErrorMessages(response.data.errors));
  }

  const checkUsernameUniqueness = () => {
    setVerifyUsername('verifying');
    axios.post(serverURL + CheckUsernameAPI,
      { username: username }
    ).then(() => {
      setVerifyUsername('verified');
      setErrorMessages([]);
    }).catch(({response}) => {
      setErrorMessages(response.data.errors);
      setVerifyUsername('not verified');
    });
  }
  
  return (
    <div className='Signup'>
      <div className='SignupContainer'>
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
          errorMessages.length ?
            <ErrorMessages errors={errorMessages} /> :
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

        <ListInstitutes
          institute={institute}
          setInstitute={setInstitute}
          institutesList={institutesList}
        />

        <ListBranches
          branch={branch}
          setBranch={setBranch}
          branchesList={institute.branches}
          disabled={Object.keys(institute).length === 0}
        />

        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div>
          <label htmlFor='password'>Password (min 8 chars)</label>
          <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        <button onClick={submit} disabled={password.length < 8}>
          Register
        </button>
      </div>
    </div>
  );
}

export default UserSignup;