import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
function Dashboard() {
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
    <>
    <h2>React Fetch Data</h2>
    <div className='container dashboard-container'>
        
        {/* <ul>
        {data.map((item, i) => {
            return <li key={i}>Name: {item.first_name} {item.last_name}, Email: {item.email_id}</li>
        })}
        </ul> */}
        <table className='table table-dark table-striped'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email ID</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, i)=>{
                    return(
                    <tr key={i}>
                        <td>{item.id}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.email_id}</td>
                        <td>
                            {/* <button className='btn btn-success'>Edit</button> */}
                            <Link className='btn btn-success' to={`/update?id=${item.id}`}>Edit</Link>
                            <Link className='btn btn-danger'>Delete</Link>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    </>
  )
}

export default Dashboard