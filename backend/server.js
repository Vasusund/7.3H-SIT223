const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());
app.use(express.json());

const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'frontend')));//path for inking all files of frontend folder


app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const msg = {
    to: email,
    from: 'vasusund1977@gmail.com',  //my sender email
    subject: 'Welcome to DEV@Deakin!',
    text: 'Thank you for subscribing to the DEV@Deakin daily insider!',
    html: '<strong>Thank you for subscribing to the DEV@Deakin daily insider!</strong>',
  };

  try {
    await sgMail.send(msg);
    res.json({ success: true, message: 'Welcome email sent!' }); // add success: true
  } catch (error) {
    console.error('SendGrid Error:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' }); // add success: false
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});