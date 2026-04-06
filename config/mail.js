/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const config = require('config');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const logger = require('../src/lib/logger');

// --- Begin sendEMail: Code to send an email

const sendEMail = (toUserEmail, mailSubject, htmlContent, callback) => {
  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: config.smtp,
    port: config.smtpPort,
    auth: {
      user: config.senderMail,
      pass: config.senderMailPswd
    }
  }));
  var mailOptions = {
    from: 'NoReply<noreply@ctportal.ai>',
    to: toUserEmail,
    subject: mailSubject,
    html: htmlContent
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error('There was an Error in config/mail.js, at sendEMail function:', error);
      return callback(error, info);
    } else {
      return callback(error, info);
    }
  });
}
// --- End sendEMail: Code to send an mail

module.exports = {
  sendEMail
};

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';
