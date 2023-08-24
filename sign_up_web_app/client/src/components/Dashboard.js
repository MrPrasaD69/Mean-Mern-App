import React,{useState,useEffect} from 'react'

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
    <div className='container'>
        <h2>React Fetch Data</h2>
        {/* <ul>
        {data.map((item, i) => {
            return <li key={i}>Name: {item.first_name} {item.last_name}, Email: {item.email_id}</li>
        })}
        </ul> */}
        <table className='table'>
            <thead>
                <tr>
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
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.email_id}</td>
                        <td>
                            <button className='btn btn-success'>Edit</button>
                            <button className='btn btn-danger'>Edit</button>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Dashboard