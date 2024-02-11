const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail', //Your Service
    auth:{
        user: 'youremail',
        pass: 'yourpass',
    },
});

module.exports = transporter;