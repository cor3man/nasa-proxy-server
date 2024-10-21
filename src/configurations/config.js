import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const config = {
  NASA_API_KEY: process.env.NASA_API_KEY,
  NASA_API_URL: process.env.NASA_API_URL,
  PORT: process.env.APP_PORT,
};

function validateEnvVariables(config) {
  console.log(config);
  const faults = Object.entries(config).filter(([value]) => !value);
  if (faults.length > 0) {
    console.error('Missing environment variables:', faults.map(([key]) => key).join(', '));

    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
  }
}

validateEnvVariables(config);

export default config;
