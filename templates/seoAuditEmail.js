module.exports = (data) => {
  const { fullName, url, email } = data;
  
  return {
    subject: `🔍 New SEO Audit Request - ${fullName || 'New Client'}`,
    
    text: `
      New SEO Audit Request Received:
      
      Client Name: ${fullName || 'Not provided'}
      Website URL: ${url}
      Contact Email: ${email}
      
      Request Time: ${new Date().toLocaleString()}
    `,
    
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #3a7bd5; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; border: 1px solid #ddd; border-top: none; }
          .footer { margin-top: 20px; font-size: 12px; color: #777; text-align: center; }
          .label { font-weight: bold; color: #3a7bd5; }
          .button { 
            display: inline-block; 
            padding: 10px 20px; 
            background-color: #3a7bd5; 
            color: white; 
            text-decoration: none; 
            border-radius: 5px; 
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🔍 New SEO Audit Request</h2>
          </div>
          <div class="content">
            <p>Hello Team,</p>
            <p>You have received a new SEO audit request with the following details:</p>
            
            <p><span class="label">Client Name:</span> ${fullName || 'Not provided'}</p>
            <p><span class="label">Website URL:</span> <a href="${url}">${url}</a></p>
            <p><span class="label">Contact Email:</span> <a href="mailto:${email}">${email}</a></p>
            <p><span class="label">Request Time:</span> ${new Date().toLocaleString()}</p>
            
            <div style="margin-top: 30px;">
              <a href="mailto:${email}" class="button">Reply to Client</a>
              <a href="${url}" class="button" style="margin-left: 10px;">Visit Website</a>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply directly to this email.</p>
            <p>© ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};