import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import { useAlert } from 'react-alert'

 const EditDisposition = (props) => {
   const alert = useAlert()
    const [formData, setFormData] = useState({
        _id:"",
        dispositionNumber:"",
    agendaNumber: "",
    letterNumber: "",
    to:"",
    description:"",
    letterStatus:"",
    responseLetter:""
    
      });
    
    const {_id, dispositionNumber,agendaNumber,letterNumber,to,description,letterStatus,responseLetter} = formData;
    

    useEffect(() => {
        async function GetId() {    
          try {
            const id = props.match.params.id;
            const incomingMail = await (await Axios.get(`/api/disposition/${_id}`)).data;
            console.log(incomingMail[0])
            setFormData({ ...incomingMail[0] });
          } catch (error) {
            console.error(error.message);
            alert.show('Id Not found')
            props.history.push("/disposition");
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
        const res = await Axios.put(`/api/disposition/${_id}`, {_id, dispositionNumber,agendaNumber,letterNumber,to,description,letterStatus,responseLetter});
        console.log(res);
        alert.show('Disposition Edited')
        return props.history.push('/disposition');
      } catch (error) {
        console.log(error);
        return props.history.push('/disposition');
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
    <button type="submit" class="ui primary button">Edit Disposition Letter</button>
  </form>
</div>
        </div>
    )
}

export default EditDisposition;