import { format } from 'date-fns';

exports.handler = Discourse => (event, context, callback) => {
  const { HtmlBody, TextBody, Subject, From, FromName } = JSON.parse(
    event.body
  );
  console.log('MAIL FORM', HtmlBody, TextBody, Subject, From, FromName);
  Discourse.createTopic(
    36,
    `${Subject} am ${format(new Date(), 'DD.MM.YYYY HH:mm')}`,
    `
  ## ${Subject}
  # ${FromName}
  Datum: ${new Date()}
  Email: ${From}
  Nachricht: ${TextBody}
  `
  ).catch(err => console.error(err.response.data));
};
