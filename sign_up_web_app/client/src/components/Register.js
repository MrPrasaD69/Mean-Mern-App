import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../App.css';

function Register() {
const navigate = useNavigate();
const [formData, setFormData] = useState({ 
    first_name: '',
    last_name:'',
    email_id:''
});

const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
};

const onSubmitHandler = async (event) => {
    event.preventDefault();
    // alert('A form was submitted: ' + JSON.stringify(formData));

    try {
        const response = await fetch('http://localhost:4000/store-data', {
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

  return (
    <div className='container'>
        <form onSubmit={onSubmitHandler} className="signup-form">
            <h1>Register</h1>
            <div className="form-group">
                <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required />
            </div>
            <div className="form-group">
            <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required />
            </div>
            <div className="form-group">
            <input type="email" id="email_id" name="email_id" value={formData.email_id} onChange={handleChange} placeholder="Email" required />
                
            </div>
            <button type="submit">Sign Up</button>
        </form>
        
    </div>
  )
}

export default Register