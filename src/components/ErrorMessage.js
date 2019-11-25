import React from 'react';

export const ErrorMessage = (props) => {
  return (
    <span className="error-message">
      {props.msg}
    </span>
  )
}
