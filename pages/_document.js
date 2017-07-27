// Right now this code is mostly about making Material-UI work with nextjs
import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { getContext, setContext } from '../styles/context';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Reset the context for handling a new request.
    setContext();
    const page = ctx.renderPage();
    // Get the context with the collected side effects.
    const context = getContext();
    return {
      ...page,
      styles: (
        <style
          id="jss-server-side"
          dangerouslySetInnerHTML={{
            __html: context.sheetsRegistry.toString(),
          }}
        />
      ),
    };
  }

  render() {
    const context = getContext();
    return (
      <html lang="en">
        <Head>
          <title>CjK&#39;s smart-home</title>
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content={
              'user-scalable=0, initial-scale=1, maximum-scale=1, ' +
              'minimum-scale=1, width=device-width, height=device-height'
            }
          />
          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={context.theme.palette.primary[500]}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
