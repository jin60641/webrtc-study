import Mailgun from 'mailgun-js';

interface Mail {
  to: string;
  subject: string;
  html: string;
}

const mailgun = Mailgun({
  apiKey: process.env.MAILGUN_API_KEY!,
  domain: `mail.${process.env.DOMAIN!}`,
});

const sendMail = (data: Mail) => new Promise((resolve) => {
  mailgun.messages().send({
    ...data,
    from: 'admin <admin@mail.hce.io>',
  }, (err, body) => {
    if (err || !body) {
      resolve(null);
    }
    resolve(body);
  });
});

export default sendMail;
