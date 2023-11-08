 import React,{useState,useEffect} from 'react'
 import { Link, useNavigate } from 'react-router-dom';
 function Dashboard() {
     const navigate = useNavigate();
     const [data, setData] = useState([]);
     const API = "http://localhost:4000/get-data";
     
     const getList=()=>{
       fetch(API)
             .then(response => response.json())
             .then(result => setData(result))
             .catch(error => console.error('Error:', error));
     }
     useEffect(() => {
       getList();        
     }, []);
 
     const handleDelete = async (id) => {
         const confirmDelete = window.confirm("Are you sure you want to delete this item?");
         if (confirmDelete) {
             // alert(id);
           try {
             const response = await fetch(`http://localhost:4000/delete-data?id=${id}`, {
               method: 'DELETE',
             });
       
             const responseData = await response.json();
             console.log(responseData);
             alert("Data Deleted");
             // navigate("/dashboard");
             getList();
           } catch (error) {
             console.error('Error:', error);
           }
         }
     };
 
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
                     <th>Image</th>
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
                         <td>{item.file_name ? <img src={`http://localhost:4000/uploads/${item.file_name}`} width="50px" height="50px" /> : 'No Image'}</td>
                         <td>
                             {/* <button className='btn btn-success'>Edit</button> */}
                             <Link className='btn btn-success' to={`/update?id=${item.id}`}>Edit</Link>
                             <Link className='btn btn-danger' onClick={()=> handleDelete(item.id)} >Delete</Link>
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