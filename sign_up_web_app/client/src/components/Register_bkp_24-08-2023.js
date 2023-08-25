import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import '../App.css';

function Register() {
const navigate = useNavigate();
const [formData, setFormData] = useState({ 
    first_name: '',
    last_name:'',
    email_id:''
});

//Update Operation Here
const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const id = searchParams.get('id');
const[editData,setEditData] = useState({
    id:id,
    first_name:'',
    last_name: '',
    email_id:''
});

const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
};

const handleEditChange = (event)=>{
    const{name, value} = event.target;
    setEditData((prevData)=>({...prevData,[name]: value}));
}

const onSubmitHandler = async (event) => {
    // event.preventDefault();
    // alert('A form was submitted: ' + JSON.stringify(formData));

    try {
        const response = await fetch(`http://localhost:4000/store-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const responseData = await response.json();
        console.log(responseData);
        navigate("/dashboard");
        alert("Data Submitted");
        setFormData({
            first_name:'',
            last_name:'',
            email_id:''
        });
    } 
    catch (error) {
        console.error('Error:', error);
    }
}

const submitUpdateHandler=async(event)=>{
    alert('A form was submitted: ' + JSON.stringify(editData));
    try {
        const response = await fetch(`http://localhost:4000/update-data/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editData)
        });

        const responseData = await response.json();
        console.log(responseData);
        // navigate("/dashboard");
        alert("Data Updated");
        setFormData({
            first_name:'',
            last_name:'',
            email_id:''
        });
    } 
    catch (error) {
        console.error('Error:', error);
    }
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

  return (
    <div className='container'>
        <form onSubmit={ id ? submitUpdateHandler : onSubmitHandler} className="signup-form">
            <h1>Register</h1>
            <div className="form-group">
                <input type="hidden" name="id" value={id? editData.id || '' : ''}/>
                <input type="text" id="first_name" name="first_name" value={id ? editData.first_name || '' : formData.first_name} onChange={id ? handleEditChange: handleChange} placeholder="First Name" required />
            </div>
            <div className="form-group">
            <input type="text" id="last_name" name="last_name" value={id ? editData.last_name || '' : formData.last_name} onChange={id ? handleEditChange: handleChange} placeholder="Last Name" required />
            </div>
            <div className="form-group">
            <input type="email" id="email_id" name="email_id" value={id ? editData.email_id || '' : formData.email_id} onChange={id ? handleEditChange: handleChange} placeholder="Email" required />
                
            </div>
            <button type="submit">{id ? 'Update' : 'Register'}</button>
        </form>
        
    </div>
  )
}

export default Register