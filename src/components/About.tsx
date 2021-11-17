import React from 'react';
import Faq from './Faq';
import { getProjectData } from './About/about-fetcher';
import './About/About.css';

// Get the project metadata. It doesn't change, so we set it on the project load
const projectKeys = ['NAME', 'VERSION', 'AUTHOR_EMAIL', 'LICENSE'];
const Project = getProjectData(projectKeys);

const About = (): JSX.Element => (
  <div className="About">
    <h3>{`App Name: ${Project.NAME}`}</h3>
    <h4>FAQ</h4>
    <Faq />
    <ul>
      <li>{`version: ${Project.VERSION}`}</li>
      <li>
        author email:
        <a href={`mailto: ${Project.AUTHOR_EMAIL}`}>{Project.AUTHOR_EMAIL}</a>
      </li>
      <li>{`license: ${Project.LICENSE}`}</li>
    </ul>
  </div>
);

export default About;
