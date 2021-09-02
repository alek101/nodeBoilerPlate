/* eslint-disable global-require */
/* eslint-disable no-undef */
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

describe('Testing apiDocs ', async () => {
  it('Create api docs', async () => {
    require('../../scripts/createDocs');
    const docsLocation = path.join(__dirname, '../../doc');
    expect(fs.existsSync(docsLocation)).to.equal(true);
  });
});
