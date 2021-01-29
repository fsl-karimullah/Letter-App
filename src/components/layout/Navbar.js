import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
const Navbar = ({title, icon}) => {
  const authContext = useContext(AuthContext);


  const { isAuthenticated, logout, user, loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
  };

  const Confirm = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>You want to Logout ?</p>
            <button onClick={onClose}>No</button>
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
            >
              Yes
            </button>
          </div>
        );
      }
    });
  }

  const authLinks = (
    <Fragment>
  <div class="ui menu" >
  <div class="header item"><Link to='/homepage'>{title} Welcome Admin</Link></div>
  <Link to='/incomingletter' className="item">Incoming Letter</Link>
  <Link to='/outgoingletter' className="item">Outgoing Letter</Link>
  <Link to='/disposition' className="item">Disposition</Link>
  <div className='item' style={{float:'right'}}>
  <a  onClick={Confirm} href='#!'>
          <span className='ui label red'>Logout</span>
   </a>
   
  </div>
  </div>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
     <div class="ui menu" >
    <div class="header item"><Link to='/homepage'>Welcome Worker</Link></div>
  <Link to='/login' class="item">Login As Admin</Link>
  <Link to='/register' class="item">Register</Link>
  <Link to='/about' class="item">About</Link>
  </div>
    </Fragment>
  );
    return (
    <div>
    {isAuthenticated ? authLinks : guestLinks}
  </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
  };
  
  Navbar.defaultProps = {
    title: 'Letter App',
    icon: 'tes'
  };

export default Navbar;