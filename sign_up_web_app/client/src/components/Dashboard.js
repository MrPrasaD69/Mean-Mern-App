import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../baseUrl";
function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const API = "http://localhost:4000/get-data";
  const [userId, setUserId] = useState('');
  const getList = () => {
    fetch(API)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error("Error:", error));
  };
  useEffect(() => {
    getList();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:4000/delete-data?id=${id}`,
          {
            method: "DELETE",
          }
        );

        const responseData = await response.json();
        console.log(responseData);
        alert("Data Deleted");
        getList();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleExport = () => {
    var sendData = {
      id:userId
    };

    fetch(`${BASE_URL}export`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.status==200){
          window.open(BASE_URL+'/exportedNodeUser.csv','_blank');
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handlePDF = () =>{
    var sendData = {
      id:userId
    };

    fetch(`${BASE_URL}exportpdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/pdf",
      },
      body: JSON.stringify(sendData),
    })
      .then((response) => response.blob())
      .then((data) => {
        // console.log(data);
        window.open(BASE_URL+'/ExportedNodeUser.pdf','_blank');
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <div className="container">
        <h2 className="text-center">User Data List</h2>
        <button
          className="btn btn-success btn-sm mb-2"
          onClick={() => handleExport()}
        >
          Export CSV
        </button>
        <button
          className="btn btn-danger btn-sm mb-2"
          onClick={() => handlePDF()}
        >
          Export PDF
        </button>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>SrNo</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email ID</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email_id}</td>
                  <td>
                    {item.file_name ? (
                      <img
                        src={`${BASE_URL}uploads/${item.file_name}`}
                        width="auto"
                        height="50px"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>
                    <Link
                      className="btn btn-sm btn-success"
                      to={`/update?id=${item.id}`}
                    >
                      Edit
                    </Link>
                    <Link
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;
