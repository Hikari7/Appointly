const nodemailer = require('nodemailer')
const { render } = require('@react-email/render')

require('dotenv').config()

const { RescheduleEmail } = require("../emailView/RescheduleEmail.jsx")

exports.sendRescheduleEmail = async (host, mtgInfo) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SENDINBLUE_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SENDINBLUE_USER,
      pass: process.env.SENDINBLUE_PASSWORD
    }
  })

  const templateHTML = render(RescheduleEmail({host, mtgInfo}))

  const rescheduleEmail = await transporter.sendMail({
    from: "Appointly",
    to: mtgInfo.email,
    subject: "Your meeting was rescheduled",
    html: templateHTML
  })

  transporter.sendMail(rescheduleEmail);

}