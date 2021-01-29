import React,{ useState, useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { useAlert } from 'react-alert';

 const Login = (props) => {
  const alert = useAlert()
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;


  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/landingpage');
    }

    if (error === 'Invalid Credentials') {
     alert.show('Invalid Credentials')
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      alert.show('Please fill in all fields');
    } else {
      login({
        email,
        password
      });
    }
  };


    return (


        <div>
            
    <div class="ui placeholder segment" style={{margin : '10%'}}>
  <div class="ui stackable very relaxed two column grid">
    <div class="column">
      <form class="ui form" onSubmit={onSubmit}>
        <div class="field">
          <label>Email</label>
          <div class="ui left icon input">
            <input  id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required placeholder="Email" />
            <i aria-hidden="true" class="user icon"></i>
          </div>
        </div>
        <div class="field">
          <label>Password</label>
          <div class="ui left icon input">
            <input id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required />
            <i aria-hidden="true" class="lock icon"></i>
          </div>
        </div>
        <input
          type='submit'
          value='Login'
          className='ui primary button'
        />
      </form>
    </div>
    <div class="middle aligned column">
      <Link to="/register" class="ui big button">
        <i aria-hidden="true" class="signup icon"></i>
        Sign up
      </Link>
    </div>
  </div>
  <div class="ui vertical divider">Or</div>
</div>
        </div>
    )
}

export default Login;


