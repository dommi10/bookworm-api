import nodemailer from "nodemailer";

const from = "'Bookworm' <info@bookworm.com>";

function setUp() {
  return nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b2b12c43ac5eb9",
      pass: "30285c24cf9187",
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
        
        ${user.generateConfirmationUrl}
        `,
  };

  transport.sendMail(email);
}

export default sendConfirmationEmail; 