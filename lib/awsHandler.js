const Aws = require('aws-sdk');
const uuid = require('uuid');

async function awsService(file) {
  const params = {
    Bucket: process.env.S3_BUCKET, // Bucket name
    Key: `${uuid.v4(file.originalname)}.jpg`, // Name of the image
    Body: file.buffer, // Body which will contain the image in buffer format
    ACL: 'public-read-write', // defining the permissions to get the public link
    ContentType: 'image/jpeg', // Necessary to define the image content-type to view the photo in the browser with the link
  };

  const s3 = new Aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  return s3.upload(params).promise();
}

const s3 = new Aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

module.exports = {
  awsService,
  s3,
};
