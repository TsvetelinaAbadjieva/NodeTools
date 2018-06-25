const nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport("SMTP",{
//     service: "Gmail",
//     // secure:false,
//     // port:587,
//     auth:{
//         type:'login',
//         user: 'TsvetelinaAbadjieva@gmail.com',
//         pass:'Tsvety77-#'
//     }
// });
// const transporter = nodemailer.createTransport({
//     transport: 'ses', // loads nodemailer-ses-transport
//     accessKeyId: 'AWSACCESSKEY',
//     secretAccessKey: 'AWS/Secret/key',
//     host:'127.0.0.1',
//     port:587
// });

var transporter;
var test ="Tsvety"
var mailoptions = {
    from: 'TsvetelinaAbadjieva@gmail.com',
    to: 'tsvetelina_abadjieva@abv.bg',
    subject: 'Sending mail from node js',
    html: `<h1>Hello ${test}from node js</h1>`
}

nodemailer.createTestAccount((err, account) => {


    transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        secure: false,
        port: 587,
        auth: {
            type: 'login',
            user: account.user,
            pass: account.pass
        }
    });
    transporter.sendMail(mailoptions, function (er, resp) {

        if (er) {
            throw er;
        } else {
            console.log('mail is sent:  ', resp);
            console.log('Preview URL:',nodemailer.getTestMessageUrl(resp))
        }
    })
});


