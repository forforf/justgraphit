
import React from 'react'
import Faq from 'Faq/Faq';
import './About.css';

export default React.createClass({
  render() {
    return (
      <div className="About">
        <h3>JustGraphIt</h3>
        <h4>FAQ</h4>
        <Faq />

        <ul>
          <li>
            version: 0.3.0
          </li>
          <li>
            author email: <a href="mailto: dmarti21@gmail.com">dmarti21@gmail.com</a>
          </li>
          <li>
            license: MIT
          </li>

        </ul>
      </div>
    )
  }
})
