import express from 'express';
import passport from 'passport';
import cors from 'cors';

import configurePassport from './config/configurePassport.js';
import authHandler from './middleware/authHandler.js';
import connectDB from './config/db.js';

import authRouter from './routes/authRouter.js';
import fridgeRouter from './routes/fridgeRouter.js';
import recipeRouter from './routes/recipeRouter.js';
import initRouter from './routes/initRouter.js';
import ingredientRouter from './routes/ingredientRouter.js';
import likeRouter from './routes/likeRouter.js';
import commentRouter from './routes/commentRouter.js';

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
app.use('/api/fridge', passport.authenticate('jwt', { session : false }), fridgeRouter);
app.use('/api/recipes', recipeRouter);
app.use('/api/ingredients', ingredientRouter);
app.use('/api/like', passport.authenticate('jwt', { session : false }), likeRouter);
app.use('/api/comment', passport.authenticate('jwt', { session : false }), commentRouter);

app.use('/init', initRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

export default app;