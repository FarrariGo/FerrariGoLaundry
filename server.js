// index.js (or server.js)

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sendEmail from './Routes/SMTP.js';
import http from 'http';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

// Simple test route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Email sending route
app.post('/api/send-email', async (req, res) => {
  const { subject, text, html } = req.body;

  try {
    const result = await sendEmail(subject, text, html);   // ✅ Don't pass 'to'
    res.status(200).json({
      success: true,
      messageId: result.messageId,
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () =>
  console.log(`Server is listening on port: ${PORT}`)
);

// Export app if needed for testing or integration
export default app;
