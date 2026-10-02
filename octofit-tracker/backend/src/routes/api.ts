import { Router } from 'express';
import mongoose, { type Model } from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const router = Router();
const resources: Array<[string, Model<any>]> = [
  ['users', User],
  ['teams', Team],
  ['activities', Activity],
  ['leaderboard', Leaderboard],
  ['workouts', Workout],
];

for (const [path, model] of resources) {
  router.get(`/${path}`, async (_request, response) => {
    const query = model.find();
    if (path === 'leaderboard') {
      query.sort({ points: -1 });
    } else {
      query.sort({ createdAt: -1 });
    }
    response.json(await query.lean());
  });

  router.post(`/${path}`, async (request, response) => {
    const record = await model.create(request.body);
    response.status(201).json(record);
  });

  router.get(`/${path}/:id`, async (request, response) => {
    if (!mongoose.isValidObjectId(request.params.id)) {
      response.status(400).json({ error: 'Invalid record id' });
      return;
    }

    const record = await model.findById(request.params.id).lean();
    if (!record) {
      response.status(404).json({ error: 'Record not found' });
      return;
    }

    response.json(record);
  });

  router.patch(`/${path}/:id`, async (request, response) => {
    if (!mongoose.isValidObjectId(request.params.id)) {
      response.status(400).json({ error: 'Invalid record id' });
      return;
    }

    const record = await model.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!record) {
      response.status(404).json({ error: 'Record not found' });
      return;
    }

    response.json(record);
  });

  router.delete(`/${path}/:id`, async (request, response) => {
    if (!mongoose.isValidObjectId(request.params.id)) {
      response.status(400).json({ error: 'Invalid record id' });
      return;
    }

    const record = await model.findByIdAndDelete(request.params.id);
    if (!record) {
      response.status(404).json({ error: 'Record not found' });
      return;
    }

    response.status(204).end();
  });
}

export default router;