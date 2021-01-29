import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import { useAlert } from 'react-alert'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
 const OutgoingLetter = (props) => {

  const [outgoingMails, setOutgoingMail] = useState({ data: [] });
  const alert = useAlert();
  
    useEffect(() => {
      async function auth() {
        try {
          const token = localStorage.getItem("token");
          const outgoingMails = await Axios.get("/api/outgoingmail", {
            headers: {
              "x-auth-token": token
            }
          });
          setOutgoingMail({ data: outgoingMails.data });
          console.log(outgoingMails.data);
        } catch (error) {
          console.log(error.message);
          return props.history.push("/landingpage");
        }
      }
  
      auth();
    }, [props]);
    
   
    let OutgoingLetter = <p>Loading...</p>;
    if (outgoingMails.data) {
      OutgoingLetter = outgoingMails.data.map((data, index) => {
        const isDeleted = async (_id) => {
          try {
            const res = await Axios.delete(`/api/outgoingmail/${data._id}`);
            alert.show('Outgoing Letter Deleted');
            props.history.push('/outgoingletter')
          } catch (error) {
            console.error(error.message);
            props.history.push('/outgoingletter')
          }
        }
        const Confirm = () => {
          confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                  <h1>Are you sure?</h1>
                  <p>You want to delete this Data?</p>
                  <button onClick={onClose}>No</button>
                  <button
                    onClick={() => {
                      isDeleted();
                      onClose();
                    }}
                  >
                    Yes, Delete it!
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
      <th class="">Agenda Number</th>
      <th class="">Letter Type</th>
      <th class="">Send Date</th>
      <th class="">Letter Number</th>
      <th class="">Sender</th>
      <th class="">Subject</th>
      <th class="">Action</th>
    </tr>
    
  </thead>
       <tbody class="">
         <tr class="" >
        <td>{index + 1}</td>
            <td class="">{data.agendaNumber}</td>
           <td class="">{data.letterType}</td>
           <td class="">{data.sendDate}</td>
           <td class="">{data.letterNumber}</td>
           <td class="">{data.sender}</td>
           <td class="">{data.subject}</td>
           <td class="">
             <Link to={`/editoutgoingletter/${data._id}`} className="ui green button">Edit</Link>
             <button onClick={Confirm} className="ui red button">Delete</button>
           </td>
         </tr> 
       </tbody>
       </div>
         )
       })
      }
    
    return (
        <div>
              <div>
            <div style={{
                margin: '5%',
                float: 'right',
                marginTop: '1%'
            }}>
                <Link to='/addoutgoingletter' className='ui green button'>Add Outgoing Letter</Link>
            </div>
        <div style={{margin: '5%', marginTop: '5%'}}>
          <table class="ui striped table" >
  
  {OutgoingLetter}
</table>
        </div>
        </div>
        </div>
    )
}
    
export default OutgoingLetter;