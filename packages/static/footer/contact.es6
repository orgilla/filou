import React, { Component } from 'react';
import { createComponent } from 'react-fela';

const Form = createComponent(
  () => ({
    '> h5': {
      marginBottom: 5,
      marginTop: 10
    },
    '> input': {
      boxShadow: '0 1px 0 #ebebec',
      borderColor: '1px solid #d0d0d0',
      borderRadius: 3,
      width: '100%',
      border: '1px solid lightgray',
      marginBottom: 5
    },
    '> textarea': {
      boxShadow: '0 1px 0 #ebebec',
      borderColor: '1px solid #d0d0d0',
      borderRadius: 3,
      width: '100%',
      border: '1px solid lightgray',
      marginBottom: 5
    },
    '> button': {
      background: '#FFF',
      paddingX: 20,
      color: '#59636d',
      fontSize: 11,
      lineHeight: '18px',
      fontWeight: 'bold',
      boxShadow: '0 1px 0 #ebebec',
      borderColor: '1px solid #d0d0d0',
      borderRadius: 3
    }
  }),
  'form',
  p => Object.keys(p)
);

class ContactForm extends Component {
  state = { done: false };
  handleSubmit = event => {
    event.preventDefault();
    if (!this.props.post) {
      console.error('Please define post endpoint');
      return;
    }
    const data = new FormData(event.target);
    const obj = {};
    [...data.keys()].filter(x => x).forEach(key => {
      obj[key] = data.get(key);
    });
    fetch(this.props.post, {
      method: 'POST',
      body: JSON.stringify({ data: obj })
    }).then(() => {
      this.setState({ done: true });
    });
  };

  render() {
    const { children } = this.props;
    const { done } = this.state;
    if (done) {
      return <span>Anfrage wurde abgeschickt.</span>;
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <p>{children}</p>
        <h5>E-Mail</h5>
        <input type="email" name="email" />
        <h5>Name</h5>
        <input type="text" name="name" />
        <h5>Text</h5>
        <textarea name="message" rows="4" />
        <button type="submit">Absenden</button>
      </Form>
    );
  }
}

export default ContactForm;
