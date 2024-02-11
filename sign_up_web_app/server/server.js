const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const app = express();
const transporter = require('./emailConfig');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
const PDFDocument = require('pdfkit');
// const pdf = require('html-pdf');
var pdf = require("pdf-creator-node");
const fs = require("fs");
const jwt = require('jsonwebtoken');
const secretKey = 'E43D6E7ABD29FBC32999F62B21FB7';
var md5 = require('md5');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "prasaddb",
});

conn.connect((err) => {
    if (err) throw err;
    console.log("Mysqli Connected...");
});

app.get("/", (req, res) => {
    res.send("Welcome to my server");
});

//login op here
app.post("/login", async (req, res) => {
    let data = {
        email_id: req.body.email_id,
        password: req.body.password,
    }
    // const hashedText = md5(`${data.email_id}|${data.password}`);
    // res.json(hashedText);
    

    const checkUser = "SELECT * FROM tbl_node_users WHERE email_id=? AND password=?";
    const checkEmail = data.email_id;
    const checkPassword = data.password;
    conn.query(checkUser, [checkEmail, checkPassword], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        const emailCount = result[0];
        // res.json(result);
        if (emailCount) {
            const payload = {
                userid: result[0].id,
                email: result[0].email_id
            }
            const options = {
                expiresIn: '1h', // Token expiration time (e.g., 1 hour)
            };

            const accessToken = jwt.sign(payload, secretKey, options);
            return res.status(200).json({ status: 200, message: "User Found", accessToken: accessToken });
        }
        else {
            return res.status(400).json({ status: 400, message: "User Not Found" });
        }

    })
})

//export to csv op here
app.post("/export", async (req, res) => {
    var checkUser = '';
    let data = {
        id: req.body.id,
        email_id: req.body.email_id,
    }

    if (data.id !== '') {
        checkUser = "SELECT * FROM tbl_node_users WHERE email_id=?";
        const checkEmail = data.email_id;
        conn.query(checkUser, checkEmail, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Internal server error" });
            }
            const emailCount = result[0];
            // res.json(result);
            // if (emailCount) {
            //     const csvWriter = createCsvWriter({
            //         path:'exportedNodeUser.csv',
            //         header:[
            //             {id:''}
            //         ]
            //     });
            //     return res.status(200).json({ status: 200, message: "User Found"});
            // }
        });
    }
    else {
        checkUser = "SELECT * FROM tbl_node_users";
        const checkEmail = data.email_id;
        conn.query(checkUser, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Internal server error" });
            }
            const emailCount = result;
            // res.json(result[0]);
            if (emailCount) {
                const csvWriter = createCsvWriter({
                    path: 'public/exportedNodeUser.csv',
                    header: [
                        { id: 'id', title: 'ID' },
                        { id: 'full_name', title: 'Name' },
                        { id:'email_id', title:'Email ID' },
                    ]
                });
                const records = emailCount.map((record)=>({
                    id:record.id,
                    full_name:`${record.first_name} ${record.last_name}`,
                    email_id:record.email_id,
                }));
                csvWriter.writeRecords(records)
                    .then(() => {
                        console.log("CSV File written");
                    })
                    .catch((err) => {
                        console.log("Error=>" + err);
                    })
                return res.status(200).json({ status: 200, message: "User Found" });
            }
        });
    }


})

//export to pdf op here
app.post("/exportpdf", async (req, res)=>{
    const checkUser = "SELECT * FROM tbl_node_users";
    conn.query(checkUser,(err, result)=>{
        if(err){
            return res.status(500).json({ error: "Internal server error" });
        }        
        const resultCount =result;
        const doc = new PDFDocument();
        const outputPath = 'public/ExportedNodeUser.pdf';
        if(resultCount){
            // doc.pipe(fs.createWriteStream(outputPath));
            // doc.fontSize(16).text('Node Users Data',{align:'center'});
            // doc.moveDown();

            // resultCount.forEach((row)=>{
            //     doc.text(`Name: ${row.first_name} ${row.last_name}`);
            //     doc.text(`Email: ${row.email_id}`);
            //     doc.moveDown();
            // })

            // doc.end();
            // const pdfStream = fs.createReadStream(outputPath);
            // res.setHeader('Content-Type','application/pdf');
            // res.setHeader('Content-Disposition','attachment; filename=ExportedNodeUser.pdf');
            // pdfStream.pipe(res);


            // let htmlContent = `<html>
            // <head>
            // <style>
            //     table {
            //     border-collapse: collapse;
            //     width: 100%;
            //     }
            //     th, td {
            //     border: 1px solid #dddddd;
            //     text-align: left;
            //     padding: 8px;
            //     }
            //     th {
            //     background-color: #f2f2f2;
            //     }
            // </style>
            // </head>
            // <body>
            //     <h2>Node Users Data</h2>
            //     <table>
            //         <tr>
            //         <th>Name</th>
            //         <th>Email</th>
            //         </tr>
            // </html>`;

            // resultCount.forEach((row)=>{
            //     htmlContent+=`<tr>`;
            //     htmlContent+=`<td>${row.first_name} ${row.last_name}</td>`;
            //     htmlContent+=`<td>${row.email_id}</td>`;
            //     htmlContent+=`</tr>`;
            // })
            // htmlContent += `
            //     </table>
            //     </body>
            //     </html>
            // `;
            // pdf.create(htmlContent).toStream((err, stream) =>{
            //     if (err) return console.error(err);
            //     res.setHeader('Content-Type', 'application/pdf');
            //     res.setHeader('Content-Disposition', 'attachment; filename=ExportedNodeUser.pdf');
            //     // Pipe the PDF stream to the response
            //     stream.pipe(res);
            // });

            var htmlTemplate = fs.readFileSync("template.html", "utf8");            
            var dynamicContent = {
                title:'User List',
                description: 'Listing Table',
            };

            var html = Object.keys(dynamicContent).reduce((acc, key) =>{
                const placeholder = `{{${key}}}`;
                return acc.replace(new RegExp(placeholder,'g'), dynamicContent[key]);
            }, htmlTemplate);

            var options = {
                format: "A3",
                orientation: "portrait",
                border: "10mm",
                header: {
                    height: "45mm",
                    contents: '<div style="text-align: center;">Author: Prasad W</div>'
                },
                footer: {
                    height: "15mm",
                    contents: {
                        first: 'Cover page',
                        2: 'Second page', // Any page number is working. 1-based index
                        default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                        last: 'Last Page'
                    }
                }
            };

            var users = resultCount;
            var document = {
                html: html,
                data: {
                  users: users,
                },
                path: "public/ExportedNodeUser.pdf",
                type: "",
            };
            pdf.create(document, options).then((data) => {
                console.log(data);
                const pdfStream = fs.createReadStream("public/ExportedNodeUser.pdf");
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=ExportedNodeUser.pdf');
                pdfStream.pipe(res);
            })
            .catch((error) => {
                console.error(error);
            });
        }
    });
})

//Store form data into DB
app.post("/store-data", async (req, res) => {
    let data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_id: req.body.email_id,
    };
    const checkExistingEmail =
        "SELECT COUNT(*) AS count FROM tbl_node_users WHERE email_id = ?";
    const checkEmail = data.email_id;
    conn.query(checkExistingEmail, checkEmail, (err, result) => {
        if (err) {
            console.error("Error checking email", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        const emailCount = result[0].count;
        if (emailCount > 0) {
            return res.status(400).json({ error: "Email already exists" });
        } else {
            let sql = "INSERT INTO tbl_node_users SET ?";
            let query = conn.query(sql, data, (err, results) => {
                if (err) throw err;
                const emailTemplate = fs.readFileSync('emailTemplate.html','utf8');
                
                // const mailOptions = {
                //     to:checkEmail,
                //     subject: 'New User Registration',
                //     text: 'Hello, '+data.first_name+' '+data.last_name+'. You have registered on our website.'
                // }

                const mailOptions= {
                    to:checkEmail,
                    subject: 'New User Registration',
                    html: emailTemplate.replace('{{first_name}}', data.first_name).replace('{{last_name}}', data.last_name),
                }

                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        console.error(error);

                        // Handle specific SMTP errors
                        if (error.code === 'EENVELOPE' || error.code === 'EMESSAGE') {
                            return res.status(400).json({ error: "Invalid email address" });
                        }
                        return res.status(500).json({ error: "Error sending email" });
                    }
                    else{
                        console.log("Email Sent "+info.response);
                    }
                })
                res.send(JSON.stringify({ status: 200, error: null }));
            });
        }
    });
});

//Get listing data from DB
app.get("/get-data", (req, res) => {
    let sql = "SELECT * FROM tbl_node_users";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

//Get Update data from DB
app.get("/get-item", (req, res) => {
    const itemId = req.query.id;
    if (!itemId) {
        return res.status(400).json({ error: "Missing id parameter" });
    }
    const sql = `SELECT * FROM tbl_node_users WHERE id = ?`;
    const query = conn.query(sql, [itemId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching data" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Item not found" });
        }
        const item = result[0];

        res.json(item);
    });
});

//Store update data into DB
app.post("/update-data", (req, res) => {
    const itemId = req.query.id;
    if (!itemId) {
        return res.status(400).json({ error: "Missing id parameter" });
    }
    const newData = req.body;
    if (!newData.first_name || !newData.last_name || !newData.email_id) {
        return res.status(400).json({ error: "Missing data fields" });
    }
    const sql = `UPDATE tbl_node_users SET ? WHERE id = ?`;
    const query = conn.query(sql, [newData, itemId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error updating data" });
        }
        res.json({ status: 200, message: "Data updated successfully" });
    });
});

//Delete data from DB
app.delete("/delete-data", (req, res) => {
    const itemId = req.query.id;
    var fileName = "";
    if (!itemId) {
        return res.status(400).json({ error: "Missing id parameter" });
    } else {
        const sql = `SELECT file_name FROM tbl_node_users WHERE id = ?`;
        const query = conn.query(sql, [itemId], (err, result) => {
            fileName = result && result[0] ? result[0].file_name : '';
            const filePath = "public/uploads/" + fileName;

            const sql = `DELETE FROM tbl_node_users WHERE id = ?`;
            const query = conn.query(sql, [itemId], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: "Error deleting data" });
                }
                if (fileName !== "") {
                    if (fs.existsSync(filePath)) {
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.error("Error removing file:", err);
                            } else {
                                res.json({ status: 200, message: "Data Deleted successfully" });
                                console.log("File removed successfully");
                            }
                        });
                    } else {
                        res.json({ status: 404, message: "File Does not Exists" });
                    }
                } else {
                    res.json({ status: 200, message: "Data Deleted successfully" });
                }
            });
        });
    }
});

currentTime = Date.now();

//File upload start here
// Set up multer storage
const storage = multer.diskStorage({
    destination: "public/uploads/", // Specify the folder where files will be saved
    filename: (req, file, cb) => {
        const fileExtension = file.mimetype.split("/")[1];
        const allowedExtensions = ["jpeg", "jpg", "png"];
        if (allowedExtensions.includes(fileExtension)) {
            cb(null, currentTime + file.originalname);
        } else {
            cb(new Error("Invalid File Type"));
        }
    },
});
const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No File provided" });
    }

    const filePath = req.file.path;
    const fileName = currentTime + req.file.originalname;

    const sql = "INSERT INTO tbl_node_users(file_name) VALUES(?)";
    const values = [fileName];

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error uploading file", err);
            return res.status(500).json({ error: "Error uploading File" });
        }
    });
    res.json({ message: "File Upload Successfully", filePath });
});
//File upload end here

// Define the static file path
// app.use(express.static(__dirname+'/uploads'));
// app.get('/get-images', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// // var file_path = __dirname;
// // res.json(file_path);
// })

app.listen(4000, () => {
    console.log("Server Running on 4000");
});
