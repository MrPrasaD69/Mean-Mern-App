const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get('/',(req, res)=>{
    res.send('Welcome Server');
});

server.get('/todos',(req,res)=>{

})

server.post('/todos',(req,res)=>{

})

server.put('/todos/:id',(req,res)=>{
    
})

server.delete('/todos/:id',(req,res)=>{
    
})

module.exports = server;