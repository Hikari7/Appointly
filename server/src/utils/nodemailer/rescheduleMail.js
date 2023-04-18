const nodemailer = require('nodemailer')
// import { render } from '@react-email/render';

require('dotenv').config()

// const RescheduleEmail = require('../emailView/RescheduleEmail')

const sendRescheduleEmail = async (host, guest, mtgInfo) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SENDINBLUE_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SENDINBLUE_USER,
      pass: process.env.SENDINBLUE_PASSWORD
    }
  })

  const rescheduleEmail = await transporter.sendMail({
    from: "Appointly",
    to: guest.email,
    subject: "Your meeting was rescheduled",
    // html: <RescheduleEmail host={host} guest={guest} mtgInfo={mtgInfo} />,
  })
}