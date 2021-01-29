import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {useAlert} from 'react-alert'

 const AddIncomingLetter = (props) => {
   const alert = useAlert()
  const [formData, setformData] = useState({
    agendaNumber: "",
    letterType: "",
    sendDate:"",
    receiveDate:"",
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
        const res = await Axios.post('/api/incomingmail', {agendaNumber,letterType,sendDate,receiveDate,letterNumber,sender,subject});
        alert.show('Surat Masuk Di Tambah')
        return props.history.push('/incomingletter');
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
        <label>No Agenda</label>
        <div class="ui fluid input"><input type="text" placeholder="Agenda Number" name="agendaNumber"
            value={agendaNumber} 
            onChange={e => onChange(e)}
            required /></div>
      </div>
      <div class="field">
        <label>Tipe Surat</label>
        <div class="ui fluid input"><input type="text" placeholder="Letter Type" name="letterType"
            value={letterType}
            onChange={e => onChange(e)} required/></div>
      </div>
      <div class="field">
        <label>Tanggal Kirim</label>
        <div class="ui fluid input"><input type="date" placeholder="Send Date" name="sendDate"
            value={sendDate}
            onChange={e => onChange(e)} required/></div>
      </div>
      <div class="field">
        <label>Tanggal Terima</label>
        <div class="ui fluid input"><input type="date" placeholder="Receive Date" name="receiveDate"
            value={receiveDate}
            onChange={e => onChange(e)} required /></div>
      </div>
      <div class="field">
        <label>No Surat</label>
        <div class="ui fluid input"><input type="text" placeholder="Letter Number" name="letterNumber"
            value={letterNumber}
            onChange={e => onChange(e)} required/></div>
      </div>
      <div class="field">
        <label>Pengirim</label>
        <div class="ui fluid input"><input type="text" placeholder="Sender" name="sender"
            value={sender}
            onChange={e => onChange(e)} required/></div>
      </div>
      <div class="field">
        <label>Subjek</label>
        <div class="ui fluid input"><input type="text" placeholder="Subject" name="subject"
            value={subject}
            onChange={e => onChange(e)} required/></div>
      </div>
    </div>
    
    <Link to='/incomingletter' type="submit" class="ui teal blue button">Kembali</Link>
    <button type="submit" class="ui primary button">Tambah Surat Masuk</button>
  </form>
</div>
        </div>
    )
}

export default AddIncomingLetter;