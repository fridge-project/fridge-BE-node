import express from 'express';
import passport from 'passport';
import cors from 'cors';

import configurePassport from './config/configurePassport.js';
import authHandler from './middleware/authHandler.js';
import connectDB from './config/db.js';

import authRouter from './routes/authRouter.js';
import fridgeRouter from './routes/fridgeRouter.js';
import recipeRouter from './routes/recipeRouter.js';

const app = express();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configurePassport();
app.use(passport.initialize());

app.use(cors({
  origin: 'http://localhost:5173' // 요청을 허용할 도메인
}));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/auth', authRouter);
app.use('/api/fridge', fridgeRouter);
app.use('/api/recipe', recipeRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
}); // git test

export default app;