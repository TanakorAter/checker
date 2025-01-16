const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// ใช้ body-parser สำหรับรับ JSON request
app.use(bodyParser.json());

// Webhook URL ของ Discord
const discordWebhookUrl = 'https://discord.com/api/webhooks/1322485650376884234/dHA29qSmH9zWyPbLmGIEDhaxjfRsRHIPHIzLAsRKijY67bJs3LreHm1NslNY5R4otthg';

// เสิร์ฟไฟล์ HTML
app.use(express.static('public'));

// Route สำหรับรับข้อมูลและส่งไปยัง Discord
app.post('/send-data', (req, res) => {
    const { ip, userAgent, referrer } = req.body;

    // สร้างข้อความที่จะส่งไปยัง Discord
    const message = `
        New user visit detected:
        IP: ${ip}
        User-Agent: ${userAgent}
        Referrer: ${referrer}
    `;

    // ส่งข้อมูลไปยัง Discord
    axios.post(discordWebhookUrl, {
        content: message,
    })
    .then(() => {
        res.status(200).send('Data sent to Discord');
    })
    .catch(error => {
        console.error('Error sending data to Discord:', error);
        res.status(500).send('Failed to send data');
    });
});

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
