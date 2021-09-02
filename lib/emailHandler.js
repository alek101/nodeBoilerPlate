const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
const error = require('../middlewares/errorHandling/errorConstants');

// TODO
const { OAuth2Client } = require('google-auth-library');

const {
  EMAIL_FROM,
  EMAIL_HOST,
  GMAIL_PROVIDER_PASSWORD,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  NODE_ENV,
  EMAIL_HOST_SERVICE,
  EMAIL_SERVICE,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GMAIL_REFRESH_TOKEN,
} = require('../config/environments');

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

/**
 * Send Email with AWS SES
 * @param {String} typeOfEmail Type of email template to send
 * @param {String} subject Email Subject to appear in email
 * @param {String[]} emailsToSend Array of email strings, ex: ['john@edu.com', 'michael@gmail.com']
 * @param {String[]} ccEmails Array of email strings to send as CC, ex: ['john@edu.com', 'michael@gmail.com']
 * @param {Object} params Extra parameters to be included in email template
 * @returns {Promise}
 */
function sendEmail(typeOfEmail, subject, emailsToSend, ccEmails = [], params = '') {
  const emailService = new AWS.SES();

  if (NODE_ENV === 'test') {
    return Promise.resolve();
  }

  return emailService
    .sendEmail({
      Destination: {
        ToAddresses: emailsToSend,
        CcAddresses: ccEmails,
      },
      Message: {
        Body: {
          Html: {
            Data: `<h1>Hello ${params}</h1>`, // Replace with email template
          },
        },
        Subject: {
          Data: subject,
        },
      },
      Source: EMAIL_FROM,
    })
    .promise();
}

/**
 * Send Email using SMTP
 * @param {String[]} recipients Array of email strings, ex: ['john@edu.com', 'michael@gmail.com']
 * @param {String} subject Email Subject to appear in email
 * @param {String[]} text Email body message
 * @param {String[]} html Email body message as html
 * @param {Object[]} [attachments] Optional attachments for email to send
 * @returns {Promise}
 */
async function sendEmailSMTP(recipients, subject, text = '', html = '', attachments) {
  if (NODE_ENV === 'test') {
    return Promise.resolve();
  }

  const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    host: EMAIL_HOST_SERVICE,
    auth: {
      user: EMAIL_HOST,
      pass: GMAIL_PROVIDER_PASSWORD,
    },
  });

  const options = {
    to: recipients,
    from: EMAIL_FROM,
    subject,
    text,
    html,
  };

  if (attachments) {
    options.attachments = attachments;
  }

  try {
    const info = await transporter.sendMail(options);
    console.info(info);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    throw new Error(error.MAIL_WAS_NOT_SENT);
  }
}

/**
 * Send Email using SMTP with OAuth2
 * @param {String[]} recipients Array of email strings, ex: ['john@edu.com', 'michael@gmail.com']
 * @param {String} subject Email Subject to appear in email
 * @param {String[]} text Email body message
 * @param {String[]} html Email body message as html
 * @param {Object[]} [attachments] Optional attachments for email to send
 * @returns {Promise}
 */
async function sendEmailSMTPOAuth(recipients, subject, text = '', html = '', attachments) {
  if (NODE_ENV === 'test') {
    return Promise.resolve();
  }

  try {
    const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

    oAuth2Client.setCredentials({
      refresh_token: GMAIL_REFRESH_TOKEN,
    });

    const token = await oAuth2Client.getAccessToken();

    const accessToken = token.res.data.access_token;

    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST_SERVICE,
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: EMAIL_HOST,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GMAIL_REFRESH_TOKEN,
        accessToken,
      },
    });

    const options = {
      to: recipients,
      from: `${EMAIL_FROM} <${EMAIL_HOST}>`,
      subject,
      text,
      html,
    };

    if (attachments) {
      options.attachments = attachments;
    }

    const info = await transporter.sendMail(options);
    console.info(info);
  } catch (error) {
    console.error(error);
    throw new Error(error.MAIL_WAS_NOT_SENT);
  }
}

module.exports = {
  sendEmail,
  sendEmailSMTP,
  sendEmailSMTPOAuth,
};
