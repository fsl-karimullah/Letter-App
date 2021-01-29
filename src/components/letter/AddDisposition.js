import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios'
import {useAlert} from 'react-alert'
const AddDisposition = (props) => {
const alert = useAlert()
  const [formData, setformData] = useState({
    dispositionNumber:"",
    agendaNumber: "",
    letterNumber: "",
    to:"",
    description:"",
    letterStatus:"",
    responseLetter:""

  });

const {dispositionNumber,agendaNumber,letterNumber,to,description,letterStatus,responseLetter} = formData;

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
        const res = await Axios.post('/api/disposition', {dispositionNumber,agendaNumber,letterNumber,to,description,letterStatus,responseLetter});
        alert.show('Disposition Letter Added')
        return props.history.push('/disposition');
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
        <label>Disposition Number</label>
        <div class="ui fluid input"><input type="text" placeholder="Disposition Number" name="dispositionNumber" value={dispositionNumber} 
            onChange={e => onChange(e)}
            required/></div>
      </div>
      <div class="field">
        <label>Agenda Number</label>
        <div class="ui fluid input"><input type="text" placeholder="Agenda Number" name="agendaNumber" value={agendaNumber} 
            onChange={e => onChange(e)}
            required/></div>
      </div>
      <div class="field">
        <label>Letter Number</label>
        <div class="ui fluid input"><input type="text" placeholder="Letter Number" name="letterNumber" value={letterNumber} 
            onChange={e => onChange(e)}
            required /></div>
      </div>
      <div class="field">
        <label>To</label>
        <div class="ui fluid input"><input type="text" placeholder="To" name="to" value={to} 
            onChange={e => onChange(e)}
            required /></div>
      </div>
      <div class="field">
        <label>Description</label>
        <div class="ui fluid input"><input type="text" placeholder="Description" name="description" value={description} 
            onChange={e => onChange(e)}
            required /></div>
      </div>
      <div class="field">
        <label>Letter Status</label>
        <div class="ui fluid input">
        {/* <select id="status">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
</select> */}
          <input type="text" placeholder="Letter Status" name="letterStatus" value={letterStatus} 
            onChange={e => onChange(e)}
            required/></div>
      </div>
      <div class="field">
        <label>Response Letter</label>
        <div class="ui fluid input"><input type="text" placeholder="Response Letter" name="responseLetter" value={responseLetter} 
            onChange={e => onChange(e)}
            required/></div>
      </div>
    </div>
    
    <Link to='/disposition' type="submit" class="ui teal blue button">Back</Link>
    <button type="submit" class="ui primary button">Disposition Letter</button>
  </form>
</div>
        </div>
    )
}

export default AddDisposition;
