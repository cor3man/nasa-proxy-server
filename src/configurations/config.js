require('dotenv').config({ path: '../.env' });

const config = {
    NASA_API_KEY: process.env.NASA_API_KEY,
    NASA_API_URL: process.env.NASA_API_URL,
    PORT: process.env.APP_PORT,
};

validateEnvVariables(config);

function validateEnvVariables(config) {
    console.log(config);
    const faults = Object.entries(config).filter(([key, value]) => !value);
    if (faults.length > 0) {
        console.error('Missing environment variables:', faults.map(([key]) => key).join(', '));
        process.exit(1);
    }
}

module.exports = config;

