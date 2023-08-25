const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'prasaddb'
});

conn.connect((err)=>{
    if(err) throw err;
    console.log('Mysqli Connected...');
});

app.get('/', (req, res) => {
    res.send('Welcome to my server');
});

app.post('/store-data',(req,res)=>{
    let data = {
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email_id:req.body.email_id,

    };
    let sql = "INSERT INTO tbl_node_users SET ?";
    let query = conn.query(sql, data, (err, results)=>{
        if(err) throw err;
        res.send(JSON.stringify({"status":200, "error":null}))
    });
});

app.get('/get-data',(req,res)=>{
    let sql = "SELECT * FROM tbl_node_users";
    let query = conn.query(sql,(err, results)=>{
        if(err) throw err;
        res.send(results);
    });
});

app.get('/get-item',(req,res)=>{
    const itemId = req.query.id;
    if(!itemId){
        return res.status(400).json({ error: 'Missing id parameter' });
    }
    const sql = `SELECT * FROM tbl_node_users WHERE id = ?`;
    const query = conn.query(sql,[itemId], (err, result)=>{
        if (err) {
            return res.status(500).json({ error: 'Error fetching data' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }
        const item = result[0];
        res.json(item);
    })
});

app.post('/update-data',(req,res)=>{
    const itemId = req.query.id;
    if (!itemId) {
        return res.status(400).json({ error: 'Missing id parameter' });
    }
    const newData = req.body;
    if (!newData.first_name || !newData.last_name || !newData.email_id) {
        return res.status(400).json({ error: 'Missing data fields' });
    }
    const sql = `UPDATE tbl_node_users SET ? WHERE id = ?`;
    const query = conn.query(sql, [newData, itemId], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Error updating data' });
        }
        res.json({ status: 200, message: 'Data updated successfully' });
    });
})

app.delete('/delete-data',(req,res)=>{
    const itemId = req.query.id;
    // res.json({ status: 200, message: 'Data Deleted successfully' });
    if (!itemId) {
        return res.status(400).json({ error: 'Missing id parameter' });
    }
    const sql = `DELETE FROM tbl_node_users WHERE id = ?`;
    const query = conn.query(sql, [itemId], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Error deleting data' });
        }
        res.json({ status: 200, message: 'Data Deleted successfully' });
    });
})

app.listen(4000, ()=>{
    console.log("Server Running on 4000");
});