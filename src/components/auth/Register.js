import React,{ useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext';
import { useAlert } from 'react-alert';

 const Register = (props) => {
  const alert = useAlert()
  
  const authContext = useContext(AuthContext);

  const { register, error, clearErrors, isAuthenticated } = authContext;

useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/login');
    }

    if (error === 'User already exists') {
      alert.show('User already exists')
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    firstName: '',
    lastName:'',
    email: '',
    password: '',
    password2: ''
  });

  const { firstName, lastName, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (firstName === '' || lastName==='' || email === '' || password === '') {
      alert.show('Please enter all fields', 'danger');
    } else if (password !== password2) {
      alert.show('Passwords do not match', 'danger');
    } else {
      register({
        firstName,
        lastName,
        email,
        password
      });
    }
  };

    return (
        <div>
            <div class="ui placeholder segment" style={{margin:'10%'}}>
  <div class="ui stackable very relaxed one column grid">
    <div class="column">
      <form class="ui form" onSubmit={onSubmit}>
        <div class="field">
          <label>First Name</label>
          <div class="ui left icon input">
            <input 
            type="text" 
            placeholder="First Name" 
            id='firstname'
            name='firstName'
            value={firstName}
            onChange={onChange}
            required
            />
            <i aria-hidden="true" class="user icon"></i>
          </div>
        </div>
        <div class="field">
          <label>Last Name</label>
          <div class="ui left icon input">
            <input type="text" 
            placeholder="Last Name" 
            id='lastname'
            name='lastName'
            value={lastName}
            onChange={onChange}
            required
             />
            <i aria-hidden="true" class="user icon"></i>
          </div>
        </div>
        <div class="field">
          <label>Email</label>
          <div class="ui left icon input">
            <input id='email'
            placeholder ='Email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required />
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
            required
            minLength='6' />
            <i aria-hidden="true" class="lock icon"></i>
          </div>
        </div>
        <div class="field">
          <label>Confirm Password</label>
          <div class="ui left icon input">
            <input  id='password2'
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='6' />
            <i aria-hidden="true" class="lock icon"></i>
          </div>
        </div>
        <input
          type='submit'
          value='Register'
          className='ui primary button'
        />
      </form>
    </div>
  </div>
</div>
        </div>
    )
}

export default Register;