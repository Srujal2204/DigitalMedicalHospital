import {useState} from "react"
import Navigation from "./Navigation";

const AddPatient =({state}) =>{

    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const closeModal = () => {
        setModalOpen(false);
        setModalContent("");
      };
    
    const createTask = async(event)=>{
        event.preventDefault();
        const {contract,account} = state;
        const adharNum = document.querySelector("#adharNum").value;  
          const name = document.querySelector("#name").value;
         const diagnostics = document.querySelector("#diag").value;
          const age = document.querySelector("#ageId").value;
         const date = document.querySelector("#date").value;
   
   try {
        const res =await fetch("http://localhost:3000/api/ethereum/addrecord",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({adharNum:adharNum})
        })
        if (!res.ok) {
          throw new Error("Failed to add record");
        }
        
        console.log(account)
         const data = await res.json()
         console.log(data)
         if(data.status===200){
            if(contract && contract.methods){
                await contract.methods
                .addPatient(adharNum,name,diagnostics,age,date)
                .send({from:account})
                setModalContent(`Data added successfully`);
               
            }
        }else{
            alert("Data cannot be added")
        }         
   } catch (error) {    
    setModalContent(`Data is already exist on ${adharNum}`);
          } finally {
            setModalOpen(true);
          }
   }
   
  
    return(
    <>
       <Navigation/>
       <div class="form">
         <form onSubmit={createTask}>
           <div class="input-row">
            <div class="input-field">
               <input id="adharNum" type="unit256" placeholder="Aadhar-Number" />
             </div>
            <div class="input-field">
               <input id="name" placeholder="Name" />
             </div>
           </div>
                      <div class="input-row">

             <div class="input-field">
               <input id="diag" placeholder="Diagnostics" />
             </div>
           <div class="input-field">
             <input id="ageId" placeholder="Age" />
           </div>

            </div>

            <div class="input-row">
                           <div class="input-field">

              <input id="date" type="date" placeholder="Dob" />
             </div>
            </div>
          

         
          <button type="submit">Add</button>
         </form>
     {modalOpen && (
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
      );
    
};
export default AddPatient;