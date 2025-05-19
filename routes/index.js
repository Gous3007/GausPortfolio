require('dotenv').config();
let express = require('express');
let router = express.Router();
let axios = require("axios");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Setup nodemailer transporter for sending emails
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

router.get("/", (req, res) => {
  res.render("index");
});

router.get('/download-resume', async (req, res) => {
  try {
    const fileUrl = 'https://res.cloudinary.com/drppaqhmd/image/upload/v1747639821/jfun0cg1inmmgznutjnk.pdf';
    const fileName = 'Gaus_Resume.pdf';

    const response = await axios.get(fileUrl, { responseType: 'stream' });

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    response.data.pipe(res);
  } catch (error) {
    res.status(500).send('Error downloading resume');
  }
});


// Handle form submission
router.post('/send-email', (req, res) => {
  // Extract form data
  const { fullname, email, websiteUrl } = req.body;

  // Validate form data
  if (!fullname || !email || !websiteUrl) {
    return res.status(400).send('All fields are required');
  }

  // Configure email options for admin notification
  const adminMailOptions = {
    from: process.env.SMTP_USER,
    to: 'choudharigauspasha@growfinix.in', // Your email address
    subject: 'New SEO Audit Form Submission',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #4a6ee0;">New SEO Audit Request</h2>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p><strong>Full Name:</strong> ${fullname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Website URL:</strong> ${websiteUrl}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #777; font-size: 12px;">This message was sent from your SEO Audit form.</p>
      </div>
    `
  };

  // Read user email template from file
  const userEmailTemplate = fs.readFileSync(
    path.join(__dirname, '..', 'templates', 'user-thank-you.html'),
    'utf8'
  );

  // Replace placeholders with actual data
  const userEmailHtml = userEmailTemplate
    .replace(/{{fullname}}/g, fullname)
    .replace(/{{websiteUrl}}/g, websiteUrl);

  // Configure email options for user confirmation
  const userMailOptions = {
    from: process.env.SMTP_USER,
    to: email, // User's email address
    subject: 'Thank You for Your SEO Audit Request',
    html: userEmailHtml
  };

  // Send email to admin
  transporter.sendMail(adminMailOptions, (adminError, adminInfo) => {
    if (adminError) {
      console.error('Error sending admin email:', adminError);
      return res.status(500).send('Error sending email. Please try again later.');
    }

    console.log('Admin email sent:', adminInfo.response);

    // Send confirmation email to user
    transporter.sendMail(userMailOptions, (userError, userInfo) => {
      if (userError) {
        console.error('Error sending user confirmation email:', userError);
        // Still redirect even if user email fails
        return res.redirect('/thank-you');
      }

      console.log('User confirmation email sent:', userInfo.response);

      res.redirect('/thank-you');
    });
  });
});

// Thank you page route
router.get('/thank-you', (req, res) => {
  res.render('thank_you');
  setTimeout(() => {
    res.render("/");
  }, 3000);
});

router.get('/download-case-study', (req, res) => {
  const filePath = path.join(__dirname, '../public/images/seo-case-study.pdf');
  res.download(filePath, 'SEO-Case-Study.pdf', (err) => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).send('Could not download file.');
    }
  });
});

module.exports = router;
