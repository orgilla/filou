import React, { Component } from 'react';
import Form from '../form';

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
