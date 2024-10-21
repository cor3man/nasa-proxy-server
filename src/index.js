import express from 'express';
import nunjucks from 'nunjucks';
import { errorHandler } from './errors/errorHandler.js';
import { getMeteors } from './controllers/meteorsController.js';
import { getForm, getRoverImageForUser } from './controllers/roverController.js';
import config from './configurations/config.js';
import { validateSchema } from './validations/validationMiddleware.js';
import { roverSchema } from './validations/roverSchema.js';

const { PORT } = config;

const app = express();
nunjucks.configure('../views', {
  autoescape: true,
  express: app,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/meteors', getMeteors);
app.get('/rover-image', getForm);
app.post('/rover-image', validateSchema(roverSchema), getRoverImageForUser);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
