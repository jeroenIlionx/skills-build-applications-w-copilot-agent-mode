import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    const userRecords = [
      { id: '650000000000000000000001', username: 'alex.runner', email: 'alex.runner@example.com', displayName: 'Alex Runner' },
      { id: '650000000000000000000002', username: 'sam.swimmer', email: 'sam.swimmer@example.com', displayName: 'Sam Swimmer' },
      { id: '650000000000000000000003', username: 'jordan.moves', email: 'jordan.moves@example.com', displayName: 'Jordan Moves' },
      { id: '650000000000000000000004', username: 'taylor.trains', email: 'taylor.trains@example.com', displayName: 'Taylor Trains' },
    ];

    const users = await Promise.all(
      userRecords.map(({ id, ...user }) =>
        User.findByIdAndUpdate(id, { $set: user }, { upsert: true, returnDocument: 'after', runValidators: true }),
      ),
    );
    const userByUsername = new Map(users.map((user) => [user.username, user]));

    const teams = [
      {
        id: '650000000000000000000101',
        name: 'Mergington Miles',
        description: 'A friendly team building a running habit together.',
        members: ['alex.runner', 'jordan.moves'],
      },
      {
        id: '650000000000000000000102',
        name: 'After-School Athletes',
        description: 'A mix of activities, teamwork, and steady progress.',
        members: ['sam.swimmer', 'taylor.trains'],
      },
    ];
    await Promise.all(
      teams.map(({ id, members, ...team }) =>
        Team.findByIdAndUpdate(
          id,
          { $set: { ...team, members: members.map((username) => userByUsername.get(username)!._id) } },
          { upsert: true, returnDocument: 'after', runValidators: true },
        ),
      ),
    );

    const activityRecords = [
      { id: '650000000000000000000201', username: 'alex.runner', type: 'running', durationMinutes: 32, distanceKm: 5.1, calories: 310, daysAgo: 1 },
      { id: '650000000000000000000202', username: 'alex.runner', type: 'strength training', durationMinutes: 25, calories: 180, daysAgo: 3 },
      { id: '650000000000000000000203', username: 'sam.swimmer', type: 'swimming', durationMinutes: 40, distanceKm: 1.2, calories: 350, daysAgo: 1 },
      { id: '650000000000000000000204', username: 'sam.swimmer', type: 'walking', durationMinutes: 28, distanceKm: 2.3, calories: 120, daysAgo: 4 },
      { id: '650000000000000000000205', username: 'jordan.moves', type: 'cycling', durationMinutes: 45, distanceKm: 14, calories: 390, daysAgo: 2 },
      { id: '650000000000000000000206', username: 'jordan.moves', type: 'running', durationMinutes: 22, distanceKm: 3.4, calories: 205, daysAgo: 5 },
      { id: '650000000000000000000207', username: 'taylor.trains', type: 'strength training', durationMinutes: 35, calories: 260, daysAgo: 1 },
      { id: '650000000000000000000208', username: 'taylor.trains', type: 'walking', durationMinutes: 30, distanceKm: 2.6, calories: 140, daysAgo: 3 },
    ];
    await Promise.all(
      activityRecords.map(({ id, username, daysAgo, ...activity }) =>
        Activity.findByIdAndUpdate(
          id,
          {
            $set: {
              ...activity,
              user: userByUsername.get(username)!._id,
              completedAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
            },
          },
          { upsert: true, returnDocument: 'after', runValidators: true },
        ),
      ),
    );

    const leaderboardRecords = [
      { username: 'alex.runner', points: 320 },
      { username: 'sam.swimmer', points: 285 },
      { username: 'jordan.moves', points: 250 },
      { username: 'taylor.trains', points: 215 },
    ];
    await Promise.all(
      leaderboardRecords.map(({ username, points }) =>
        Leaderboard.findOneAndUpdate(
          { user: userByUsername.get(username)!._id },
          { $set: { points } },
          { upsert: true, returnDocument: 'after', runValidators: true },
        ),
      ),
    );

    const workoutRecords = [
      { id: '650000000000000000000301', title: 'Easy 20-Minute Run', description: 'A relaxed run at a pace that still lets you talk.', activityType: 'running', durationMinutes: 20, difficulty: 'beginner' },
      { id: '650000000000000000000302', title: 'Bodyweight Basics', description: 'Practice squats, push-ups, and planks with good form.', activityType: 'strength training', durationMinutes: 25, difficulty: 'beginner' },
      { id: '650000000000000000000303', title: 'Steady Pool Session', description: 'Swim easy lengths with short rests between sets.', activityType: 'swimming', durationMinutes: 30, difficulty: 'intermediate' },
      { id: '650000000000000000000304', title: 'Neighborhood Ride', description: 'Build endurance with a comfortable outdoor ride.', activityType: 'cycling', durationMinutes: 40, difficulty: 'intermediate' },
      { id: '650000000000000000000305', title: 'Walk and Stretch', description: 'Take a brisk walk, then stretch your legs and shoulders.', activityType: 'walking', durationMinutes: 25, difficulty: 'beginner' },
      { id: '650000000000000000000306', title: 'Tempo Run Intervals', description: 'Alternate brisk running with easy recovery jogs.', activityType: 'running', durationMinutes: 35, difficulty: 'advanced' },
    ];
    await Promise.all(
      workoutRecords.map(({ id, ...workout }) =>
        Workout.findByIdAndUpdate(id, { $set: workout }, { upsert: true, returnDocument: 'after', runValidators: true }),
      ),
    );

    console.log('Database seeding complete: 4 users, 2 teams, 8 activities, 4 leaderboard entries, and 6 workouts.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
