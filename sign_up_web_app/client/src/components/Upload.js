import React,{useState} from 'react'

function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (selectedFile) {
          const formData = new FormData();
          formData.append('file', selectedFile);
    
        try{
            const response = await fetch('http://localhost:4000/upload', {
              method: 'POST',
              body: formData,
            });
    
            const responseData = await response.json();
            console.log(responseData);
            // You can handle success and error responses here
        } catch (error) {
            console.error('Error:', error);
          }
        }
    };

  return (
    <div className='container'>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default Upload