const nodeMailer = require("nodemailer");

const sendEmail = (email, sub, content) => {
  try {
    const transport = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "webtesting1999@gmail.com",
        pass: "cxjctypypsdtxiaz",
      },
    });

    const mailOption = {
      from: "webtesting1999@gmail.com",
      to: email,
      subject: sub,
      html: content,
    };

    transport.sendMail(mailOption, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
