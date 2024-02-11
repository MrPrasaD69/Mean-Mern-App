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
        if(response.status===200){
            console.log(responseData);
            navigate("/dashboard");
            
            setFormData({
                first_name:'',
                last_name:'',
                email_id:''
            });
        }
        else if(response.status===400){
            // alert(responseData.error);
        }
        else{
            alert("Error submitting data. Please try again.");
        }
    } 
    catch (error) {
        console.error('Error:', error);
    }
}

//Update Operation Here
// const location = useLocation();
// const searchParams = new URLSearchParams(location.search);
// const id = searchParams.get('id');
// const[editData,setEditData] = useState({
//     first_name:'',
//     last_name: '',
//     email_id:''
// });

// useEffect(()=>{
//     if(id){
//         fetch(`http://localhost:4000/get-item?id=${id}`)
//         .then(response => response.json())
//         .then(result =>{
//             setEditData({
//                 id:result.id,
//                 first_name: result.first_name,
//                 last_name: result.last_name,
//                 email_id: result.email_id,
//             });
//         })
//         .catch(error=> console.error('Error::', error));
//     }
// },[id]);

  return (
    <div className='container'>
        <form onSubmit={onSubmitHandler} className="signup-form">
            <h1>Register</h1>
            <div className="form-group">
                {/* <input type="hidden" value={id? editData.id || '' : ''}/> */}
                <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required />
            </div>
            <div className="form-group">
            <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required />
            </div>
            <div className="form-group">
            <input type="email" id="email_id" name="email_id" value={formData.email_id} onChange={handleChange} placeholder="Email" required />
                
            </div>
            <button type="submit">Register</button>
        </form>
        
    </div>
  )
}

export default Register