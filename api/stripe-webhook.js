// api/stripe-webhook.js
// Vercel Serverless Function: Stripe -> MailerLite Brücke
//
// WICHTIG: Diese Version braucht KEIN npm-Paket (kein "stripe", keine
// package.json-Änderung nötig) - die Signaturprüfung läuft mit Node's
// eingebautem crypto-Modul. Das behebt den 500-Fehler, der entstand, weil
// das "stripe"-Paket nicht in package.json installiert war.
//
// Was das macht:
// 1. Empfängt den Stripe-Webhook "checkout.session.completed"
// 2. Prüft die Stripe-Signatur selbst (HMAC-SHA256), ohne fremdes Paket
// 3. Fügt den Käufer per MailerLite-API zur Gruppe "TELC B1 Oktober" hinzu
//    -> löst automatisch die MailerLite-Automation "TELC B1 Willkommensmail" aus
//
// Setup (einmalig, unverändert):
// In den Vercel-Projekteinstellungen zwei Umgebungsvariablen setzen:
//   STRIPE_WEBHOOK_SECRET   -> aus dem Stripe-Dashboard, Webhook-Endpoint-Details
//   MAILERLITE_API_KEY      -> MailerLite -> Einstellungen -> Integrationen -> API
// (STRIPE_SECRET_KEY wird in dieser Version NICHT mehr gebraucht.)

import crypto from 'crypto';

const MAILERLITE_GROUP_ID = '198942403485238321'; // TELC B1 Oktober
const TOLERANCE_SECONDS = 300; // Stripe-Standard: 5 Minuten

export const config = {
  api: {
    bodyParser: false, // wir brauchen den rohen Request-Body für die Signaturprüfung
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

// Verifiziert eine Stripe-Webhook-Signatur ohne das "stripe"-npm-Paket.
// Wirft einen Error, wenn die Signatur ungültig oder zu alt ist.
function verifyStripeSignature(rawBody, signatureHeader, secret) {
  if (!signatureHeader) {
    throw new Error('Kein stripe-signature Header vorhanden.');
  }

  const parts = Object.fromEntries(
    signatureHeader.split(',').map((part) => {
      const [key, value] = part.split('=');
      return [key, value];
    })
  );

  const timestamp = parts.t;
  const expectedSignature = parts.v1;

  if (!timestamp || !expectedSignature) {
    throw new Error('stripe-signature Header hat unerwartetes Format.');
  }

  const age = Math.floor(Date.now() / 1000) - Number(timestamp);
  if (age > TOLERANCE_SECONDS) {
    throw new Error('Zeitstempel außerhalb des Toleranzbereichs.');
  }

  const signedPayload = `${timestamp}.${rawBody.toString('utf8')}`;
  const computedSignature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload, 'utf8')
    .digest('hex');

  const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
  const computedBuffer = Buffer.from(computedSignature, 'utf8');

  if (
    expectedBuffer.length !== computedBuffer.length ||
    !crypto.timingSafeEqual(expectedBuffer, computedBuffer)
  ) {
    throw new Error('Signatur stimmt nicht überein.');
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  let rawBody;
  let event;

  try {
    rawBody = await buffer(req);
    verifyStripeSignature(
      rawBody,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );
    event = JSON.parse(rawBody.toString('utf8'));
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
