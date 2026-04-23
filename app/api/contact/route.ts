import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Vyplňte povinné polia.' }, { status: 400 });
    }

    const apiKey = process.env.SMTP2GO_API_KEY;
    const sender = process.env.SMTP2GO_SENDER;
    const recipient = process.env.CONTACT_FORM_RECIPIENT;

    if (!apiKey || !sender || !recipient) {
      console.error('Missing SMTP2GO env vars');
      return NextResponse.json({ error: 'Konfigurácia emailu chýba.' }, { status: 500 });
    }

    const html = `
      <h2 style="color:#1f2937;font-family:sans-serif;">Nová správa z kontaktného formulára</h2>
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;font-weight:bold;color:#6b7280;width:120px">Meno:</td><td style="padding:8px">${name}</td></tr>
        <tr style="background:#f9fafb"><td style="padding:8px;font-weight:bold;color:#6b7280">Email:</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
        ${phone ? `<tr><td style="padding:8px;font-weight:bold;color:#6b7280">Telefón:</td><td style="padding:8px"><a href="tel:${phone}">${phone}</a></td></tr>` : ''}
        ${subject ? `<tr style="background:#f9fafb"><td style="padding:8px;font-weight:bold;color:#6b7280">Predmet:</td><td style="padding:8px">${subject}</td></tr>` : ''}
        <tr><td style="padding:8px;font-weight:bold;color:#6b7280;vertical-align:top">Správa:</td><td style="padding:8px;white-space:pre-wrap">${message}</td></tr>
      </table>
      <hr style="margin:20px 0;border:none;border-top:1px solid #e5e7eb"/>
      <p style="font-size:12px;color:#9ca3af;font-family:sans-serif">Jazdené – jazdene.eu</p>
    `;

    const res = await fetch('https://api.smtp2go.com/v3/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        sender,
        to: [recipient],
        subject: subject ? `Kontakt: ${subject}` : `Nová správa od ${name}`,
        html_body: html,
        text_body: `Meno: ${name}\nEmail: ${email}\nTelefón: ${phone || '-'}\nPredmet: ${subject || '-'}\n\n${message}`,
      }),
    });

    const data = await res.json();
    if (data.data?.succeeded === 1) {
      return NextResponse.json({ ok: true });
    }
    console.error('SMTP2GO error:', data);
    return NextResponse.json({ error: 'Email sa nepodarilo odoslať.' }, { status: 500 });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Chyba servera.' }, { status: 500 });
  }
}
