import React, { Fragment } from 'react';
import { Privacy, Cookie } from '../iubenda';

const About = ({ children, title }) => (
  <Fragment>
    <h3>{title}</h3>
    <p>{children}</p>
    <h5>Informationen zu Datenschutz und Cookies</h5>
    <Privacy />
    <Cookie />
  </Fragment>
);

export default About;
