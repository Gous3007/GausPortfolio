let express = require('express');
let router = express.Router();
let axios = require("axios");

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

module.exports = router;
