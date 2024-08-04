const nodemailer = require("nodemailer");
export default async function mail(req, res) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'patsy83@ethereal.email',
        pass: '2zTbVEs7yVu6WWTqdQ'
    }
});

  const mailData = {
    from: "Chat API",
    to: req.body.email,
    subject: `Verify your email`,
    text: req.body.message,
  };

  try {
    const info = await transporter.sendMail(mailData);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ message: `An error occurred: ${err}` });
  }
}