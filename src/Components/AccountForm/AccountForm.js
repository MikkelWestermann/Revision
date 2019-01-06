import React from 'react';
import './AccountForm.css';

const AccountForm = ({ name, handleChangeForm, elseText, handleOnSubmit, children }) => {
  return (
    <form className='accountForm' onSubmit={handleOnSubmit}>
      <div className='accountFormHeader'>
        <h3>{name}</h3>
      </div>
      <div className='accountFormBody'>
        {children}
      </div>
      <p onClick={handleChangeForm}>{elseText}</p>
    </form>
  );
}

export default AccountForm;
