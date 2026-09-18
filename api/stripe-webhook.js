// api/stripe-webhook.js
// Vercel Serverless Function: Stripe -> MailerLite Brücke
//
// Was das macht:
// 1. Empfängt den Stripe-Webhook "checkout.session.completed" (ausgelöst bei jeder
//    erfolgreichen Zahlung über den Payment Link)
// 2. Prüft die Stripe-Signatur (sonst könnte jeder gefälschte Zahlungen vortäuschen)
// 3. Fügt den Käufer per MailerLite-API zur Gruppe "TELC B1 Oktober" hinzu
//    -> das löst automatisch die MailerLite-Automation "TELC B1 Willkommensmail" aus
//
// Setup (einmalig):
// 1. Diese Datei unter /api/stripe-webhook.js ins bestehende Vercel-Projekt-Repo legen
// 2. In den Vercel-Projekteinstellungen zwei Umgebungsvariablen setzen:
//      STRIPE_WEBHOOK_SECRET   -> bekommst du, sobald der Webhook in Stripe angelegt ist
//      MAILERLITE_API_KEY      -> euer MailerLite API-Key (Einstellungen -> Integrationen -> API)
// 3. Deployen (git push), dann Bescheid geben -> ich lege den Stripe-Webhook-Endpoint
//    per API auf eure endgültige URL an (https://learngermanwithjonas.de/api/stripe-webhook)

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

const MAILERLITE_GROUP_ID = '198942403485238321'; // TELC B1 Oktober

export const config = {
  api: {
    bodyParser: false, // Stripe braucht den rohen Request-Body für die Signaturprüfung
  },
};

function buffer(readable) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readable.on('data', (chunk) => chunks.push(chunk));
    readable.on('end', () => resolve(Buffer.concat(chunks)));
    readable.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  let event;
  try {
    const rawBody = await buffer(req);
    const signature = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook-Signatur ungültig:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const email = session.customer_details?.email;
    const name = session.customer_details?.name || '';

    if (!email) {
      console.error('Keine E-Mail in der Checkout Session gefunden.');
      return res.status(200).json({ received: true, warning: 'no_email' });
    }

    try {
      const mlResponse = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          fields: { name },
          groups: [MAILERLITE_GROUP_ID],
        }),
      });

      if (!mlResponse.ok) {
        const errText = await mlResponse.text();
        console.error('MailerLite-Fehler:', errText);
        return res.status(502).json({ error: 'mailerlite_failed', detail: errText });
      }

      console.log(`Erfolgreich zu MailerLite hinzugefügt: ${email}`);
    } catch (err) {
      console.error('Fehler beim MailerLite-Aufruf:', err);
      return res.status(502).json({ error: 'mailerlite_request_failed' });
    }
  }

  return res.status(200).json({ received: true });
}
