import React from 'react';
import {Link} from 'react-router-dom';
import  OutgoingImage from '../../assets/email.svg';
import IncomingImage from '../../assets/receive.svg';


const LandingPage = (props) => {
    return (
    <div className='ui very relaxed two column grid' style={{marginLeft: '13%'}}>
    <div class="ui card" style={{margin:'10%'}}>
  <div class="image"><img className='ui small image' style={{padding:'4%', margin: '-2.5%'}} src={IncomingImage} /></div>
  <div class="content">
    <div class="header">Incoming Letter</div>
    <div class="description">
    Incoming letters are letters received by an organization / company from someone or from an organization.
    </div>
    <Link to='/incomingletter' className="ui primary button">Incoming Letter</Link>
  </div>
</div>

<div class="ui card" style={{margin:'10%'}}>
  <div class="image"><img className='ui small image' style={{padding:'4%', margin: '-2.5%'}} src={OutgoingImage} /></div>
  <div class="content">
    <div class="header">Outgoing Letter</div>
    <div class="description">
    Outgoing letters are letters issued / made by an organization / company to be sent to other parties, both individuals and groups.
    </div>
    <Link to='/outgoingletter' className="ui primary button">Outgoing Letter</Link>
  </div>
</div>


        </div>
    )
}

export default LandingPage;