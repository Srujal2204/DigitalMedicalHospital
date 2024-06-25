import { useState } from "react";
import Navigation from"./Navigation"


const GetRecord =() =>{
    const [record,setRecord]=useState({name:null,diagnostics:null,age:null,dob:null});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const getRecord =async(event)=>{
        try {
            event.preventDefault()
            const num= document.querySelector("#adharNumber").value;
            const res = await fetch(`http://localhost:3000/api/ethereum/records/${num}`,
               {
             method :"GET",
                   headers :{
                 "content-type":"application/json"
             }
                
            });
            const data = await res.json();
            console.log(data)
           if(data.status===200){
            setRecord(data.taskObj)
           }else{
            throw new Error();
           }
        } catch (error) {
            setModalContent("Task does not exist");
        setModalVisible(true)
        }
    }

 return<>
    <Navigation/>
    <div class="form-view">
     {record.name!==null && record.diagnostics!== null && record.age!==null && record.dob!==null ? (
          <div className="view_task_by_id">
            <p>Name: {record.name}</p>
            <p>Diagnostics: {record.diagnostics}</p>
            <p>Age: {record.age}</p>
            <p>Dob: {record.dob}</p>
          </div>
        ) : (
          <div className="empty_div"></div>
        )}
    <form onSubmit={getRecord} >
        <label>
            Aadharcard No. :
            <input id="adharNumber"/>
        </label><br /><br />
        <button type="submit">View</button>
    </form>
    {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <p>{modalContent}</p>
            </div>
          </div>
        )}
        </div>
    </>
};
export default GetRecord;