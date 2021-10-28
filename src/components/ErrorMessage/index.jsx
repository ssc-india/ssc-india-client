import React from "react";

const ErrorMessages = ({ errors }) =>
  <div className='error'>
    {
      errors.map((err, index) => <div key={index}>{err.message}</div>)
    }
  </div>

export default ErrorMessages;