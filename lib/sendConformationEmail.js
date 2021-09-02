const { sendEmailSMTP } = require('./emailHandler');

const sendConformationEmail = async (email, token, req, name = '') => {
  const verificationLink = `${req.protocol}://${req.get('host')}/auth/email/confirm/${token}`;

  const html = `
        <h3> Poštovani/a ${name}, </h3>
        <br>
        <p>Dobrodošli/a u Partajmer.</p>
        <p>Da biste uspešno kompletirali proces registracije kliknite na sledeći link:</p>
        <br><br>
        <a href='${verificationLink}'> Partajmer </a>
    `;

  await sendEmailSMTP(email, 'Registracija', '', html);
};

module.exports = {
  sendConformationEmail,
};
