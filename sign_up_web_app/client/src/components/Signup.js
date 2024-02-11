import React, {useState, useEffect} from 'react';
// import './Signup.css';
// import { useNavigate  } from 'react-router-dom';
function Signup() {
    // const navigate = useNavigate();
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
            // navigate("/");
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

    const [data, setData] = useState([]);
    const API = "http://localhost:4000/get-data";
    useEffect(() => {
        // Fetch data from the server when the component mounts
        fetch(API)
            .then(response => response.json())
            .then(result => setData(result))
            .catch(error => console.error('Error:', error));
    }, []);


  return (
    <div className='container'>
        <form onSubmit={onSubmitHandler} className="signup-form">
            <h1>Sign Up</h1>
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
        <div className='data-box'>
            <h2>React Fetch Data</h2>
            <ul>
            {data.map((item, i) => {
                return <li key={i}>{item.first_name}, {item.last_name}, {item.email_id}</li>
            })}
            </ul>
        </div>
    </div>
  )
}

export default Signup