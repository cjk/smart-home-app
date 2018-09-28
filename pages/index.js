import * as React from 'react'

import AppBar from '../components/AppBar'
import Dashboard from '../components/dashboard'

const IndexPage = () => (
  <div className="app">
    <AppBar />
    <Dashboard />

    {/* Add Gradient */}
    <style global jsx>{`
      .app {
        background: linear-gradient(to bottom, grey 0, white 160px);
        filter: progid:DXImageTransform.Microsoft.gradient(
            startColorstr='grey',
            endColorstr='white',
            GradientType=0
          );
      }
    `}</style>
  </div>
)

export default IndexPage
