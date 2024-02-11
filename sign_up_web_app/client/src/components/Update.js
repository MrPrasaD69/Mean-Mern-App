import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

function Update() {
  const navigate = useNavigate();
  //Update Operation Here
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [editData, setEditData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email_id: "",
    file_name:"",
  });

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/get-item?id=${id}`)
        .then((response) => response.json())
        .then((result) => {
          setEditData({
            id: result.id,
            first_name: result.first_name,
            last_name: result.last_name,
            email_id: result.email_id,
            file_name:result.file_name,
          });
        })
        .catch((error) => console.error("Error::", error));
    }
  }, [id]);

  const onUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/update-data?id=${editData.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );

      const responseData = await response.json();
      alert("Data Updated");
      navigate("/dashboard");
      setEditData({
        first_name: "",
        last_name: "",
        email_id: "",
        file_name:"",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={onUpdateSubmitHandler} className="signup-form">
        <h1>Update Details</h1>
        <div className="row">
          <div className="col-md-3 mb-2">
            <input type="hidden" value={editData.id} />
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={editData.first_name}
              onChange={handleUpdateChange}
              placeholder="First Name"
              required
            />
          </div>
          <div className="col-md-3 mb-2">
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={editData.last_name}
              onChange={handleUpdateChange}
              placeholder="Last Name"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="email"
              id="email_id"
              name="email_id"
              value={editData.email_id}
              onChange={handleUpdateChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="col-md-3">
            <img src={editData.file_name ? `http://localhost:4000/uploads/${editData.file_name}` : ''} width="auto" height="60px" alt="" />
            <input type="file" name="image_file" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-5 mb-5">
            <button type="submit">Update</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Update;
