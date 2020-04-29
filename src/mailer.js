import nodemailer from "nodemailer";

const from = "'Bookworm' <info@bookworm.com>";

function setUp() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

function sendConfirmationEmail(user) {
  const transport = setUp();
  const email = {
    from,
    to: user.email,
    subject: "Welcome to Boookworm",
    text: `
        Welcome to Bookworm. Please, confirm your email,
        
        ${user.generateConfirmationUrl()}
        `,
  };

  transport.sendMail(email);
}

export default sendConfirmationEmail;
