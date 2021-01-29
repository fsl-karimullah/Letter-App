import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import { useAlert } from 'react-alert'

 const EditIncomingLetter = (props) => {
   const alert = useAlert()
    const [formData, setFormData] = useState({
        _id:"",
        agendaNumber: "",
        letterType: "",
        sendDate:"",
        receiveDate:"",
        letterNumber:"",
        sender:"",
        subject:""
    
      });
    
    const {_id, agendaNumber,letterType,sendDate,receiveDate,letterNumber,sender,subject} = formData;
    

    useEffect(() => {
        async function GetId() {    
          try {
            const id = props.match.params.id;
            const incomingMail = await (await Axios.get(`/api/incomingmail/${_id}`)).data;
            console.log(incomingMail[0])
            setFormData({ ...incomingMail[0] });
          } catch (error) {
            console.error(error.message);
            alert.show('Id Not found')
            props.history.push("/incomingletter");
          }
        }
        GetId();
      }, [props]);

 

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e =>{
      e.preventDefault();

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const res = await Axios.put(`/api/incomingmail/${_id}`, {_id,agendaNumber,letterType,sendDate,receiveDate,letterNumber,sender,subject});
        console.log(res);
        alert.show('Incoming letter edited')
        return props.history.push('/incomingletter');
      } catch (error) {
        console.log(error);
        return props.history.push('/incomingletter');
      }
  }

    return (
     <div>
    <div class="ui inverted segment" style={{margin: '10%'}}>
  <form class="ui inverted form" onSubmit={onSubmit}>
    <div class="equal width fields">
      <div class="field">
        <label>Agenda Number</label>
        <div class="ui fluid input"><input type="text" placeholder="Agenda Number" name="agendaNumber"
            value={agendaNumber}
            onChange={onChange} /></div>
      </div>
      <div class="field">
        <label>Letter Type</label>
        <div class="ui fluid input"><input type="text" placeholder="Letter Type" name="letterType"
            value={letterType}
            onChange={onChange}/></div>
      </div>
      <div class="field">
        <label>Send Date</label>
        <div class="ui fluid input"><input type="date" placeholder="Send Date" name="sendDate"
            value={sendDate}
            onChange={onChange}/></div>
      </div>
      <div class="field">
        <label>Receive Date</label>
        <div class="ui fluid input"><input type="date" placeholder="Receive Date" name="receiveDate"
            value={receiveDate}
            onChange={onChange} /></div>
      </div>
      <div class="field">
        <label>Letter Number</label>
        <div class="ui fluid input"><input type="text" placeholder="Letter Number" name="letterNumber"
            value={letterNumber}
            onChange={onChange}/></div>
      </div>
      <div class="field">
        <label>Sender</label>
        <div class="ui fluid input"><input type="text" placeholder="Sender" name="sender"
            value={sender}
            onChange={onChange}/></div>
      </div>
      <div class="field">
        <label>Subject</label>
        <div class="ui fluid input"><input type="text" placeholder="Subject" name="subject"
            value={subject}
            onChange={onChange}/></div>
      </div>
    </div>
    
    <Link to='/incomingletter' type="submit" class="ui teal blue button">Back</Link>
    <button type="submit" class="ui primary button">Edit Incoming Letter</button>
  </form>
</div>
        </div>
    )
}

export default EditIncomingLetter;