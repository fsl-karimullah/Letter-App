import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import { useAlert } from 'react-alert'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
 const Disposition = (props) => {
    const [disposition, setDisposition] = useState({ data: [] });
    const alert = useAlert();
    
    
    
      useEffect(() => {
        async function auth() {
          try {
            const token = localStorage.getItem("token");
            const disposition = await Axios.get("/api/disposition", {
              headers: {
                "x-auth-token": token
              }
            });
            setDisposition({ data: disposition.data });
            console.log(disposition.data);
          } catch (error) {
            console.log(error.message);
            return props.history.push("/landingpage");
          }
        }
    
        auth();
      }, [props]);
      
     
      let Disposition = <p>Loading...</p>;
      if (disposition.data) {
        Disposition = disposition.data.map((data,index) => {
          const isDeleted = async (_id) => {
            try {
              const res = await Axios.delete(`/api/disposition/${data._id}`);
              alert.show('Disposition Letter Deleted');
              props.history.push('/disposition')
            } catch (error) {
              console.error(error.message);
              props.history.push('/disposition')
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
      <th class="">Disposition Number</th>
        <th class="">Agenda Number</th>
        <th class="">To</th>
        <th class="">Description</th>
        <th class="">Letter Number</th>
        <th class="">Letter Status</th>
        <th class="">Response Letter</th>
      </tr>
      {/* dispositionNumber:"",
    agendaNumber: "",
    letterNumber: "",
    to:"",
    description:"",
    letterStatus:"",
    responseLetter:"" */}
    </thead>
         <tbody class="">
           <tr class=""  >
              <td>{index + 1}</td>
              <td class="">{data.dispositionNumber}</td>
              <td class="">{data.agendaNumber}</td>
             <td class="">{data.to}</td>
             <td class="">{data.description}</td>
             <td class="">{data.letterNumber}</td>
             <td class="">{data.letterStatus}</td>
             <td class="">{data.responseLetter}</td>
             <td class="">
               <Link to={`/editdisposition/${data._id}`} className="ui green button">Edit</Link>
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
                  <Link to='/adddisposition' className='ui green button'>Add Disposition Letter</Link>
              </div>
          <div style={{margin: '5%', marginTop: '5%'}}>
            <table class="ui striped table" >
    
    {Disposition}
  </table>
          </div>
          </div>
          </div>
      )
  }
   


export default Disposition;