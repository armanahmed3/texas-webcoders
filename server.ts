import express from 'express';
import path from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import {
  getPublishedBlogs,
  getBlogById,
  generateDailyBlogArticle,
  initDailyBlogCron,
} from './src/server/blogAutomation';

dotenv.config();

// Create flexible nodemailer transport
const createEmailTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
};

const transporter = createEmailTransporter();
const RECIPIENT_EMAIL = process.env.NOTIFICATION_EMAIL || 'info@texaswebcoders.com';
const SENDER_EMAIL = process.env.SMTP_FROM || 'leads@texaswebcoders.com';

async function sendNotificationEmail(subject: string, htmlContent: string, replyTo?: string) {
  console.log(`\n================== [EMAIL DISPATCH: ${subject}] ==================`);
  console.log(`To: ${RECIPIENT_EMAIL}`);
  if (replyTo) console.log(`Reply-To: ${replyTo}`);
  console.log(`Content:\n${htmlContent.replace(/<[^>]*>?/gm, ' ').trim().slice(0, 300)}...\n==================================================================\n`);

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"TexasWebCoders Platform" <${SENDER_EMAIL}>`,
        to: RECIPIENT_EMAIL,
        replyTo: replyTo || RECIPIENT_EMAIL,
        subject,
        html: htmlContent,
      });
      console.log(`[EMAIL SUCCESS] Sent "${subject}" to ${RECIPIENT_EMAIL}`);
      return true;
    } catch (err) {
      console.error('[EMAIL ERROR] Failed to send email via SMTP:', err);
      return false;
    }
  } else {
    console.log(`[EMAIL NOTICE] No SMTP credentials in .env. Logged notification to server stdout.`);
    return true;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing
  app.use(express.json({ limit: '10mb' }));

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // 1. Contact Form & Lead Inquiries Endpoint
  app.post('/api/inquiry', async (req, res) => {
    const { name, email, phone, service, budget, message, packageSelect, projectId } = req.body;
    
    const leadId = projectId || `TWC-${Math.floor(100000 + Math.random() * 900000)}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: #090d16; padding: 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 20px; font-weight: bold; letter-spacing: 1px;">TEXAS WEB CODERS</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #94a3b8;">New Client Project Inquiry • ${leadId}</p>
        </div>
        <div style="padding: 24px; color: #1e293b;">
          <h2 style="font-size: 16px; margin-top: 0; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Client Information</h2>
          <table style="width: 100%; font-size: 14px; line-height: 1.6;">
            <tr><td style="font-weight: bold; width: 140px; color: #64748b;">Client Name:</td><td>${name || 'Not provided'}</td></tr>
            <tr><td style="font-weight: bold; color: #64748b;">Email Address:</td><td><a href="mailto:${email}">${email || 'Not provided'}</a></td></tr>
            <tr><td style="font-weight: bold; color: #64748b;">Phone Number:</td><td><a href="tel:${phone}">${phone || 'Not provided'}</a></td></tr>
            <tr><td style="font-weight: bold; color: #64748b;">Requested Service:</td><td><strong>${service || packageSelect || 'General Inquiry'}</strong></td></tr>
            <tr><td style="font-weight: bold; color: #64748b;">Budget Estimate:</td><td><strong>${budget || 'Custom Quote'}</strong></td></tr>
          </table>
          <h2 style="font-size: 16px; margin-top: 24px; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Project Scope & Notes</h2>
          <div style="background: #f8fafc; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #334155; border: 1px solid #e2e8f0;">
            ${message || 'No additional details provided.'}
          </div>
          <div style="margin-top: 24px; padding: 16px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-size: 13px; color: #166534; font-weight: bold;">Lead Assigned to Texas WebCoders Engineering Team</p>
          </div>
        </div>
      </div>
    `;

    await sendNotificationEmail(`🚀 New Lead [${leadId}]: ${name || 'Inquiry'} (${service || 'Custom Web'})`, html, email);
    res.json({ success: true, leadId, message: 'Inquiry received. The Texas WebCoders team will contact you within 2 business hours.' });
  });

  // 2. Booked Appointments Endpoint
  app.post('/api/appointment', async (req, res) => {
    const { bookingId, serviceTitle, duration, date, time, meetingPlatform, clientName, clientEmail, clientPhone, clientNotes } = req.body;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: #0f172a; padding: 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 20px; font-weight: bold;">TEXAS WEB CODERS</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #38bdf8;">📅 Confirmed Strategy Consultation • ${bookingId}</p>
        </div>
        <div style="padding: 24px; color: #1e293b;">
          <h2 style="font-size: 16px; margin-top: 0; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Session Schedule</h2>
          <table style="width: 100%; font-size: 14px; line-height: 1.6;">
            <tr><td style="font-weight: bold; width: 140px; color: #64748b;">Consultation:</td><td><strong>${serviceTitle || 'Strategy Call'}</strong></td></tr>
            <tr><td style="font-weight: bold; color: #64748b;">Date & Time:</td><td><strong style="color: #0284c7;">${date} at ${time}</strong> (${duration || '30 Min'})</td></tr>
            <tr><td style="font-weight: bold; color: #64748b;">Meeting Platform:</td><td>${meetingPlatform || 'Google Meet'}</td></tr>
            <tr><td style="font-weight: bold; color: #64748b;">Host:</td><td>Texas WebCoders Senior Solutions Architect</td></tr>
          </table>
          <h2 style="font-size: 16px; margin-top: 24px; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Client Details</h2>
          <table style="width: 100%; font-size: 14px; line-height: 1.6;">
            <tr><td style="font-weight: bold; width: 140px; color: #64748b;">Name:</td><td>${clientName}</td></tr>
            <tr><td style="font-weight: bold; color: #64748b;">Email:</td><td><a href="mailto:${clientEmail}">${clientEmail}</a></td></tr>
            <tr><td style="font-weight: bold; color: #64748b;">Phone:</td><td><a href="tel:${clientPhone}">${clientPhone || 'Not provided'}</a></td></tr>
            <tr><td style="font-weight: bold; color: #64748b;">Client Notes:</td><td>${clientNotes || 'None'}</td></tr>
          </table>
        </div>
      </div>
    `;

    await sendNotificationEmail(`📅 New Booked Appointment [${bookingId}]: ${clientName} on ${date} at ${time}`, html, clientEmail);
    res.json({ success: true, bookingId, message: 'Appointment booked and email notification dispatched successfully.' });
  });

  // 3. Complete Live Chat Transcript Endpoint
  app.post('/api/chat-transcript', async (req, res) => {
    const { clientName, clientEmail, clientPhone, messages, userNote } = req.body;

    const transcriptRows = Array.isArray(messages)
      ? messages
          .map((m: any) => {
            const isUser = m.sender === 'user';
            const bg = isUser ? '#f0f9ff' : '#f8fafc';
            const border = isUser ? '#bae6fd' : '#e2e8f0';
            const senderName = isUser ? (clientName || 'Visitor') : 'Texas WebCoders Support Specialist';
            return `
              <div style="margin-bottom: 12px; padding: 12px 16px; background: ${bg}; border: 1px solid ${border}; border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; font-size: 11px; color: #64748b; margin-bottom: 4px; font-weight: bold;">
                  <span>${senderName}</span>
                  <span>${m.timestamp || ''}</span>
                </div>
                <div style="font-size: 13px; color: #1e293b; line-height: 1.5;">${m.text || ''}</div>
              </div>
            `;
          })
          .join('')
      : '<p>No transcript messages recorded.</p>';

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden;">
        <div style="background: #020617; padding: 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 20px; font-weight: bold;">TEXAS WEB CODERS</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #38bdf8;">💬 Live Chat Transcript & Lead Intake</p>
        </div>
        <div style="padding: 24px; color: #1e293b;">
          <h2 style="font-size: 15px; margin-top: 0; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Visitor Contact Info</h2>
          <table style="width: 100%; font-size: 13px; line-height: 1.6; margin-bottom: 20px;">
            <tr><td style="font-weight: bold; width: 140px; color: #64748b;">Visitor Name:</td><td>${clientName || 'Live Chat Visitor'}</td></tr>
            <tr><td style="font-weight: bold; color: #64748b;">Email:</td><td><a href="mailto:${clientEmail}">${clientEmail || 'Not provided'}</a></td></tr>
            <tr><td style="font-weight: bold; color: #64748b;">Phone:</td><td><a href="tel:${clientPhone}">${clientPhone || 'Not provided'}</a></td></tr>
            ${userNote ? `<tr><td style="font-weight: bold; color: #64748b;">Quick Note:</td><td>${userNote}</td></tr>` : ''}
          </table>

          <h2 style="font-size: 15px; margin-top: 20px; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Conversation History</h2>
          <div style="margin-top: 14px;">
            ${transcriptRows}
          </div>
        </div>
      </div>
    `;

    await sendNotificationEmail(`💬 Live Chat Transcript: ${clientName || clientEmail || 'Visitor'} (Texas WebCoders)`, html, clientEmail);
    res.json({ success: true, message: 'Live chat transcript sent to email successfully.' });
  });

  // 4. Automated Blogs REST API Endpoints
  // GET /api/blogs - Return all published articles
  app.get('/api/blogs', (req, res) => {
    try {
      const blogs = getPublishedBlogs();
      res.json({ success: true, count: blogs.length, blogs });
    } catch (err) {
      console.error('[API ERROR] Failed to fetch blogs:', err);
      res.status(500).json({ success: false, error: 'Failed to retrieve published blogs' });
    }
  });

  // GET /api/blogs/:id - Return single article by ID
  app.get('/api/blogs/:id', (req, res) => {
    try {
      const article = getBlogById(req.params.id);
      if (!article) {
        return res.status(404).json({ success: false, error: 'Article not found' });
      }
      res.json({ success: true, article });
    } catch (err) {
      console.error('[API ERROR] Failed to fetch article:', err);
      res.status(500).json({ success: false, error: 'Failed to retrieve article' });
    }
  });

  // POST /api/blogs/generate-daily - Trigger instant generation of a fresh daily article
  app.post('/api/blogs/generate-daily', async (req, res) => {
    try {
      const { customTopic } = req.body || {};
      const newArticle = await generateDailyBlogArticle(customTopic);
      res.json({
        success: true,
        message: 'Daily AI Blog generated and published successfully.',
        article: newArticle,
      });
    } catch (err) {
      console.error('[API ERROR] Failed to generate daily blog:', err);
      res.status(500).json({ success: false, error: 'Failed to generate daily article' });
    }
  });

  // Initialize automated 24-hour background blog publisher
  initDailyBlogCron();

  // Vite middleware for development vs Static serving for production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TexasWebCoders Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
