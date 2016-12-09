/* @flow */
import compression from 'compression';
import express from 'express';
import render from './render';

const app = express();

app.use(compression());
app.use('/assets', express.static('build', { maxAge: '200d' }));

// This is to serve static external Javascript-files, like MDL's material.js
// CjK 22.01.2016: Is this still needed in addition to the above?
app.use('/assets/js', express.static('assets/js', { maxAge: '200d' }));

app.get('*', render);

export default app;
