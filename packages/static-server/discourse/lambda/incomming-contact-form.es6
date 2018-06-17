import { format } from 'date-fns';

exports.handler = Discourse => (event, context, callback) => {
  const { name, email, message } = JSON.parse(event.body).data;
  console.log('CONTACT FORM', name, email, message);
  Discourse.createTopic(
    32,
    `${name} am ${format(new Date(), 'DD.MM.YYYY HH:mm')}`,
    `
  ## ${name}
  Datum: ${new Date()}
  Email: ${email}
  Nachricht: ${message}
  `
  ).catch(err => console.error(err.response.data));
};
