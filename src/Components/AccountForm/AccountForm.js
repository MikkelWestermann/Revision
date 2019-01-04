import React from 'react';
import './AccountForm.css';

const AccountForm = props => {
  return (
    <form className='accountForm'>
      <div className='accountFormHeader'>
        <h3>{props.name}</h3>
      </div>
      <div className='accountFormBody'>
        {props.children}
      </div>
      <p onClick={props.handleChangeForm}>{props.elseText}</p>
    </form>
  );
}

export default AccountForm;
