import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {useAlert} from 'react-alert'
 const AddOutgoingLetter = (props) => {
const alert = useAlert()
  const [formData, setformData] = useState({
    agendaNumber: "",
    letterType: "",
    sendDate:"",
    letterNumber:"",
    sender:"",
    subject:""

  });

const {agendaNumber,letterType,sendDate,receiveDate,letterNumber,sender,subject} = formData;

  const onChange = e => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e =>{
      e.preventDefault();

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const res = await Axios.post('/api/outgoingmail', {agendaNumber,letterType,sendDate,letterNumber,sender,subject});
        alert.show('Outgoing Letter Added')
        return props.history.push('/outgoingletter');
      } catch (error) {
        console.log(error);
      }
  }

    return (
        <div>
        <div class="ui inverted segment" style={{margin: '10%'}}>
  <form class="ui inverted form" onSubmit={onSubmit}>
    <div class="equal width fields">
      <div class="field">
        <label>Agenda Number</label>
        <div class="ui fluid input"><input type="text" placeholder="Agenda Number" name="agendaNumber" value={agendaNumber} 
            onChange={e => onChange(e)}
            required/></div>
      </div>
      <div class="field">
        <label>Letter Type</label>
        <div class="ui fluid input"><input type="text" placeholder="Letter Type" name="letterType" value={letterType} 
            onChange={e => onChange(e)}
            required/></div>
      </div>
      <div class="field">
        <label>Send Date</label>
        <div class="ui fluid input"><input type="date" placeholder="Send Date" name="sendDate" value={sendDate} 
            onChange={e => onChange(e)}
            required /></div>
      </div>
      <div class="field">
        <label>Letter Number</label>
        <div class="ui fluid input"><input type="text" placeholder="Letter Number" name="letterNumber" value={letterNumber} 
            onChange={e => onChange(e)}
            required /></div>
      </div>
      <div class="field">
        <label>Sender</label>
        <div class="ui fluid input"><input type="text" placeholder="Sender" name="sender" value={sender} 
            onChange={e => onChange(e)}
            required/></div>
      </div>
      <div class="field">
        <label>Subject</label>
        <div class="ui fluid input"><input type="text" placeholder="Subject" name="subject" value={subject} 
            onChange={e => onChange(e)}
            required/></div>
      </div>
    </div>
    
    <Link to='/outgoingletter' type="submit" class="ui teal blue button">Back</Link>
    <button type="submit" class="ui primary button">Add Outgoing Letter</button>
  </form>
</div>
        </div>
    )
}

export default AddOutgoingLetter;