import React from 'react';
import { NavLink } from 'react-router-dom'

import './ListWrap.css';

const ListWrap = props => {
  return (
    <div className='listWrap'>
      <div className='listNav'>
        <NavLink className='listNavLink' activeClassName="activeList" to={`/${props.from}/${props.firstLink}`}>{props.firstLink}</NavLink>
        <NavLink className='listNavLink' activeClassName="activeList" to={`/${props.from}/${props.secondLink}`}>{props.secondLink}</NavLink>
      </div>
      {props.children}
    </div>
  )
}

export default ListWrap;
