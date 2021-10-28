import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { ErrorMessages } from "../../components";

const serverURL = process.env.REACT_APP_BE_URL || '';
const VerifyEmailAPI = process.env.REACT_APP_Verify_Email || '';

const VerifyEmail = ({ id }) => {
  const [verified, setVerified] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() =>
    axios.post(serverURL + VerifyEmailAPI,
      { id: id }
    ).then(() => setVerified(true))
    .catch(({response}) => setErrorMessages(response.data.errors))
  , [id]);

  if(verified) {
    return (
      <div>
        <p>Email ID verified! <Link to='/authUser'>Login</Link> to create your first post!</p>
      </div>
    );
  } else if(errorMessages.length) {
    return (
      <ErrorMessages errors={errorMessages} />
    );
  } else {
    return (
      <div>
        <p>Verifying ...</p>
      </div>
    );
  }
}

export default VerifyEmail;