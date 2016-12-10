
import React from 'react'
import Faq from '../../components/Faq/Faq';

export default React.createClass({
  render() {
    return (
      <div>
        <h3>JustGraphIt</h3>
        <h4>FAQ</h4>
        <Faq />

        <ul>
          <li>
            version: 0.3.0
          </li>
          <li>
            author email: <a href="mailto: dmarti21@gmail.com">forforf c/o Dave Martin</a>
          </li>
          <li>
            license: MIT
          </li>

        </ul>
      </div>
    )
  }
})
