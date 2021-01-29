import React, { useEffect, useState } from 'react'
import Axios from "axios";
import {Link} from 'react-router-dom'
import {useAlert} from 'react-alert'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
 const IncomingLetter = (props) => {
  const [incomingMails, setIncomingMail] = useState({ data: [] });
const alert = useAlert();



  useEffect(() => {
    async function auth() {
      try {
        const token = localStorage.getItem("token");
        const incomingMails = await Axios.get("/api/incomingmail", {
          headers: {
            "x-auth-token": token
          }
        });
        setIncomingMail({ data: incomingMails.data });
        console.log(incomingMails.data);
      } catch (error) {
        console.log(error.message);
        return props.history.push("/landingpage");
      }
    }

    auth();
  }, [props]);
  
 
  let IncomingLetter = <p>Loading...</p>;
  
if (incomingMails.data) {
  IncomingLetter = incomingMails.data.map((data, index) => {
    
    const isDeleted = async (_id) => {
      try {
        const res = await Axios.delete(`/api/incomingmail/${data._id}`);
        alert.show('Surat Masuk Dihapus');
        props.history.push('/incomingletter')
      } catch (error) {
        console.error(error.message);
        props.history.push('/incomingletter')
      }
    }
    const Confirm = () => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui'>
              <h1>Peringatan </h1>
              <p>Apakah Anda Yakin Akan Menghapus Data Surat Ini ?</p>
              <button onClick={onClose}>Tidak</button>
              <button
                onClick={() => {
                  isDeleted();
                  onClose();
                }}
              >
                Iya
              </button>
            </div>
          );
        }
      });
    }
    return(
     <div>
      <thead class="">
     <tr class="">
     <th class="">No</th>
      <th class="">No Agenda</th>
      <th class="">Tipe Surat</th>
      <th class="">Tanggal Kirim</th>
      <th class="">Tanggal Terima</th>
      <th class="">No Surat</th>
      <th class="">Pengirim</th>
      <th class="">Subjek</th>
      <th class="">Aksi</th>
    </tr>
  </thead>
   
  <tbody class="">
    <tr class=""  >
    <td>{index + 1}</td>
       <td class="">{data.agendaNumber}</td>
      <td class="">{data.letterType}</td>
      <td class="">{data.sendDate}</td>
      <td class="">{data.receiveDate}</td>
      <td class="">{data.letterNumber}</td>
      <td class="">{data.sender}</td>
      <td class="">{data.subject}</td>
      <td class="">
        <Link to={`/editincomingletter/${data._id}`} className="ui green button">Edit</Link>
        <Link to={`/editdisposition/${data._id}`} className="ui green button">Disposisikan</Link>
        <button onClick={Confirm} className="ui red button">Hapus</button>
      </td>
    </tr> 
  </tbody>
  </div>
    )
  })
}
    return (
        <div>
            <div style={{
                margin: '5%',
                float: 'right',
                marginTop: '1%'
            }}>
                <Link to='/addincomingletter' className='ui green button'>Tambah Surat Masuk</Link>
                
            </div>
        <div style={{margin: '5%', marginTop: '5%'}}>
          <table class="ui striped table" >
       
     {IncomingLetter}
    
</table>
        </div>
        </div>
    )
}

export default IncomingLetter;