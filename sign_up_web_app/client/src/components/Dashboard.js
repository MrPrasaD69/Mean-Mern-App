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
        <ul>
        {data.map((item, i) => {
            return <li key={i}>Name: {item.first_name} {item.last_name}, Email: {item.email_id}</li>
        })}
        </ul>
    </div>
  )
}

export default Dashboard