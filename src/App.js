import React,{Fragment} from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/letter/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import About from './components/letter/About';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/letter/LandingPage';
import IncomingLetter from './components/letter/IncomingLetter';
import OutgoingLetter from './components/letter/OutgoingLetter';
import AddIncomingLetter from './components/letter/AddIncomingLetter';
import AddOutgoingLetter from './components/letter/AddOutgoingLetter';
import Disposition from './components/letter/Disposition';
import AddDisposition from './components/letter/AddDisposition';
import AuthState from './context/auth/AuthState';
import PrivateRoute from './routing/PrivateRoute';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import EditIncomingLetter from './components/letter/EditIncomingLetter';
import EditOutgoingLetter from './components/letter/EditOutgoingLetter';
import EditDisposition from './components/letter/EditDisposition';

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 2000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}



function App() {
  return (
    <div className="">
      <AuthState>
      <AlertProvider template={AlertTemplate} {...options}>
       <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Switch>
                  <Route exact path='/homepage' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                  <PrivateRoute exact path='/landingpage' component={LandingPage}/>
                  <PrivateRoute exact path='/incomingletter' component={IncomingLetter}/>
                  <PrivateRoute exact path='/outgoingletter' component={OutgoingLetter}/>
                  <PrivateRoute exact path='/disposition' component={Disposition}/>
                  <PrivateRoute exact path='/addincomingletter' component={AddIncomingLetter}/>
                  <PrivateRoute exact path='/addoutgoingletter' component={AddOutgoingLetter}/>
                  <PrivateRoute exact path='/adddisposition' component={AddDisposition}/>
                  <PrivateRoute exact path={`/editincomingletter/:id`} component={EditIncomingLetter}/>
                  <PrivateRoute exact path={`/editoutgoingletter/:id`} component={EditOutgoingLetter}/>
                  <PrivateRoute exact path={`/editdisposition/:id`} component={EditDisposition}/>
                </Switch>
              </div>
            </Fragment>
          </Router>
          </AlertProvider>
          </AuthState>
    </div>
  );
}

export default App;
