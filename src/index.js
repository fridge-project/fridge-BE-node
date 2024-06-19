import express from 'express';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

import authRouter from './routes/authRouter.js';
import fridgeRouter from './routes/fridgeRouter.js';
import recipeRouter from './routes/recipeRouter.js';

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/auth', authRouter);
app.use('/api/fridge', fridgeRouter);
app.use('/api/recipe', recipeRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

export default app;