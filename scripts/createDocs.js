/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const { createDoc } = require('apidoc');
const path = require('path');
const { NODE_ENV } = require('../config/environments');

const docsLocation = path.join(__dirname, '../doc');
const components = path.join(__dirname, '../components');

// Deleting prevouis doc folder
fs.rmdirSync(docsLocation, { recursive: true });

if (NODE_ENV === 'development' || NODE_ENV === 'test') {
  const doc = createDoc({
    src: components,
    dest: docsLocation,
  });

  if (typeof doc !== 'boolean') {
    // Documentation was generated!
    console.log(`Apidoc generated at ${docsLocation}`);
  }
}
