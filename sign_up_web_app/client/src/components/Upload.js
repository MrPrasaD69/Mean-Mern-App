import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Upload() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // const handleUpload = async () => {
  //   if (selectedFile) {
  //     const maxSizeInBytes = 2 * 1024 * 1024;
  //     const allowedExtensions = [".jpg", ".jpeg", ".png"];
  //     const fileExtension = selectedFile ? selectedFile.name.split(".").pop().toLowerCase() : "";

  //     if (selectedFile.size > maxSizeInBytes) {
  //       alert("Images less than 2MB allowed only!");
  //       setImageError("Error");
  //     } else {
  //       setImageError("");
  //     }
  //     if (!allowedExtensions.includes(`.${fileExtension}`)) {
  //       alert("Only JPG, PNG, JPEG file formats allowed!");
  //       setImageError("Error");
  //     } else {
  //       setImageError("");
  //     }
  //     if (imageError == "") {
  //       alert("no error");
  //       const formData = new FormData();
  //       formData.append("file", selectedFile);
  //       try {
  //         const response = await fetch("http://localhost:4000/upload", {
  //           method: "POST",
  //           body: formData,
  //         });
  //         const responseData = await response.json();
  //         console.log(responseData);
  //         navigate("/dashboard");
  //       } catch (error) {
  //         console.error("Error:", error);
  //       }
  //     } else {
  //       alert("Image Error");
  //     }
  //   } else {
  //     alert("Please select file");
  //   }
  // };

  const handleUpload = async () => {
    var image_error="";
    const maxSizeInBytes = 2 * 1024 * 1024;
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    const fileExtension = selectedFile
      ? selectedFile.name.split(".").pop().toLowerCase()
      : "";
    try {
      if (selectedFile) {
        if (!allowedExtensions.includes(`.${fileExtension}`)) {
          alert("Only JPG, PNG, JPEG file formats allowed!");
          image_error="Error";
          return;
        }

        if (selectedFile.size > maxSizeInBytes) {
          alert("Images less than 2MB allowed only!");
          image_error="Error";
          return;
        }
		
        if (image_error !== "") {
          alert("Image Error");
        } else {
          const formData = new FormData();
          formData.append("file", selectedFile);
          try {
            const response = await fetch("http://localhost:4000/upload", {
              method: "POST",
              body: formData,
            });
            const responseData = await response.json();
            console.log(responseData);
            navigate("/dashboard");
          } catch (error) {
            console.error("Error:", error);
          }
        }
      } else {
        alert("Please select File.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="container">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Upload;
