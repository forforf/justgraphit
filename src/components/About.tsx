import React from 'react';
import Faq from './Faq';
import './About/About.css';

const About = (): JSX.Element => (
  <div className="About">
    <h3>App Name: {process.env.REACT_APP_NAME}</h3>
    <h4>FAQ</h4>
    <Faq />
    <ul>
      <li>version: {process.env.REACT_APP_VERSION}</li>
      <li>
        author email:
        <a href="mailto: dmarti21@gmail.com">dmarti21@gmail.com</a>
      </li>
      <li>license: MIT</li>
    </ul>
  </div>
);

export default About;
