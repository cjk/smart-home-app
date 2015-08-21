import Component from '../../client/components/component.react';
import React from 'react';

import {GoogleFont, TypographyStyle} from './base-typography';

export default class Html extends Component {

  static propTypes = {
    bodyHtml: React.PropTypes.string.isRequired,
    isProduction: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string.isRequired,
    version: React.PropTypes.string.isRequired
  }

  render() {
    const {bodyHtml, isProduction, title, version} = this.props;

    // Only for production. For dev, it's handled by webpack with livereload.
    const linkStyles = isProduction &&
      <link
        href={`/build/app.css?v=${version}`}
        rel="stylesheet"
      />;

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
          <title>{title}</title>

          {/* Keep the patched (by react-mdl) library local for now, later it could become s.th. like: */}
          {/*<script src="https://storage.googleapis.com/code.getmdl.io/1.0.0/material.min.js"></script> */}
          <script src="/assets/js/material.js"></script>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

          {/* Via Typography.js */}
          <GoogleFont />
          <TypographyStyle />

          {linkStyles}
        </head>
        <body dangerouslySetInnerHTML={{__html: bodyHtml}} />
      </html>
    );
  }

}
