import React, { Fragment } from 'react';
import { Privacy, Cookie } from '../iubenda';

const About = ({ children, title, iubendaPolicyId }) => (
  <Fragment>
    <h3>{title}</h3>
    <p>{children}</p>
    <h5>Informationen zu Datenschutz und Cookies</h5>
    <Privacy iubendaPolicyId={iubendaPolicyId} />
    <Cookie iubendaPolicyId={iubendaPolicyId} />
  </Fragment>
);

export default About;
