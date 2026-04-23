const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, phone, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Meno, email a správa sú povinné polia.' }) };
    }

    const data = {
      api_key: process.env.SMTP2GO_API_KEY,
      sender: process.env.SMTP2GO_SENDER,
      to: [process.env.CONTACT_FORM_RECIPIENT],
      subject: `Nová správa z webu Jazdené.eu od ${name}`,
      html_body: `
        <h3>Nová správa z kontaktného formulára</h3>
        <p><strong>Meno:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefón:</strong> ${phone || 'Neuvedené'}</p>
        <p><strong>Správa:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await axios.post('https://api.smtp2go.com/v3/email/send', data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Správa bola úspešne odoslaná.' }),
    };
  } catch (error) {
    console.error('Error sending email:', error.response?.data || error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Nepodarilo sa odoslať správu. Skúste to prosím neskôr.' }),
    };
  }
};
