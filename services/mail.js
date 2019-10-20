const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: `${process.env.SMTPHOST}`,
    port: `${process.env.SMTPPORT}`,
    auth: {
      user: `${process.env.SMTPUSER}`,
      pass: `${process.env.SMTPPASS}`
    }
  });

transport.verify((err, res) => {
    if (err) {
        console.error(err);
    }else{
        console.log('Servidor listo para enviar correos');
    }
});

module.exports = transport;