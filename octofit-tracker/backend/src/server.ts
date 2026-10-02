import express, { RequestHandler } from 'express';
import mongoose from 'mongoose';
import './config/database';

const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;

const userModel = mongoose.model(
  'User',
  new mongoose.Schema({}, { strict: false, collection: 'users' }),
);
const activityModel = mongoose.model(
  'Activity',
  new mongoose.Schema({}, { strict: false, collection: 'activities' }),
);

const app = express();
app.use(express.json());

const listUsers: RequestHandler = async (_request, response, next) => {
  try {
    response.json(await userModel.find().lean().exec());
  } catch (error) {
    next(error);
  }
};

const listActivities: RequestHandler = async (_request, response, next) => {
  try {
    response.json(await activityModel.find().lean().exec());
  } catch (error) {
    next(error);
  }
};

app.get('/api/users', listUsers);
app.get('/api/activities', listActivities);

async function startServer() {
  await mongoose.connection.asPromise();
  app.listen(port, () => {
    console.log(`OctoFit API listening at ${apiBaseUrl}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Unable to start the OctoFit API:', error);
  process.exitCode = 1;
});