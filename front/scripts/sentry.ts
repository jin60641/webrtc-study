require('dotenv').config()
  
const SentryCli = require('@sentry/cli');

const createReleaseAndUpload = async () => {
  const release = process.env.REACT_APP_RELEASE;
  if (!release) {
    return;
  }
  const cli = new SentryCli();
  console.log('Creating sentry release ' + release);
  await cli.releases.new(release);
  console.log('Uploading source maps');
  await cli.releases.uploadSourceMaps(release, {
    include: ['build'],
    urlPrefix: '~/build',
    rewrite: false,
  });
  console.log('Finalizing release');
  await cli.releases.finalize(release);
  console.error('Source maps uploading failed');
}
createReleaseAndUpload();
