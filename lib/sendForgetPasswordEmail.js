const { sendEmailSMTP } = require('./emailHandler');

const sendForgetPasswordEmail = async (email, resetToken, req) => {
  const resetPasswordLink = `${req.protocol}://${req.get('host')}/auth/password/reset/${resetToken}`;

  const html = `
        <h3> Poštovani/a, </h3>
        <br>
        <p>Da biste uspešno resetovali lozinku kliknite na sledeći link:</p>
        <br><br>
        <a href='${resetPasswordLink}'> Partajmer </a>
    `;

  await sendEmailSMTP(email, 'Reset Lozinke', '', html);
};

module.exports = {
  sendForgetPasswordEmail,
};
