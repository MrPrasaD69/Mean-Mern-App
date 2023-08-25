import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import '../App.css';

function Update() {

    const navigate = useNavigate();
    //Update Operation Here
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const[editData,setEditData] = useState({
        id:'',
        first_name:'',
        last_name: '',
        email_id:''
    });

    const handleUpdateChange=(event)=>{
        const { name, value } = event.target;
        setEditData((prevData) => ({ ...prevData, [name]: value }));
        
    }
    useEffect(()=>{
        if(id){
            fetch(`http://localhost:4000/get-item?id=${id}`)
            .then(response => response.json())
            .then(result =>{
                setEditData({
                    id:result.id,
                    first_name: result.first_name,
                    last_name: result.last_name,
                    email_id: result.email_id,
                });
            })
            .catch(error=> console.error('Error::', error));
        }
    },[id]);
    
    const onUpdateSubmitHandler = async (event) => {
        event.preventDefault();
        alert('A form was submitted: ' + JSON.stringify(editData));
    
        try {
            const response = await fetch(`http://localhost:4000/update-data?id=${editData.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editData)
            });
    
            const responseData = await response.json();
            console.log(responseData);
            alert("Data Updated");
            navigate("/dashboard");
            setEditData({
                first_name:'',
                last_name:'',
                email_id:''
            });
        } 
        catch (error) {
            console.error('Error:', error);
        }
    }

  return (
    <div className='container'>
        <form onSubmit={onUpdateSubmitHandler} className="signup-form">
            <h1>Update Details</h1>
            <div className="form-group">
                <input type="hidden" value={editData.id}/>
                <input type="text" id="first_name" name="first_name" value={editData.first_name} onChange={handleUpdateChange} placeholder="First Name" required />
            </div>
            <div className="form-group">
            <input type="text" id="last_name" name="last_name" value={editData.last_name} onChange={handleUpdateChange} placeholder="Last Name" required />
            </div>
            <div className="form-group">
            <input type="email" id="email_id" name="email_id" value={editData.email_id} onChange={handleUpdateChange} placeholder="Email" required />
                
            </div>
            <button type="submit">Update</button>
        </form>
        
    </div>
  )
}

export default Update