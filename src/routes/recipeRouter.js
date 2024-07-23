import { Router } from 'express';
import passport from 'passport';
const router = Router();

import Process from '../models/Process.js';
import Recipe from '../models/recipe.js';
import Comment from '../models/comment.js';
import Like from '../models/like.js';
import Favorite from '../models/favorite.js';

router.get('/', async (req, res) => { // 전체 레시피 조회
  try{
    const recipe = await Recipe.find();

    return res.send(recipe);
  }
  catch(err) {
    return res.status(500).send("recipe 불러오기 실패");
  }
});

router.get('/:recipe_code', passport.authenticate('jwt', { session : false }), async (req, res) => { // 레시피 과정 상세 보기
  try{
    const { recipe_code } = req.params;

    const recipe = await Recipe.findOne({ recipe_code });
    const recipe_id = recipe._id;

    const process = await Process.find({ recipe_code });
    const comment = await Comment.findOne({ recipe_id, user_id: req.user._id });
    const like = await Like.findOne({ recipe_id, user_id: req.user._id });
    const favorite = await Favorite.findOne({ recipe_id, user_id: req.user._id });

    return res.send({process, comment, like, favorite});
  }
  catch(err) {
    return res.status(500).send(err); // "process 불러오기 실패"
  }
});

// // 단일 기능 API
// app.get('/api/recipe/:id/steps', getRecipeSteps);
// app.get('/api/recipe/:id/comments', getRecipeComments);
// app.get('/api/recipe/:id/likes', getRecipeLikes);

// // 복합 API
// app.get('/api/recipe/:id/details', async (req, res) => {
//   const recipeId = req.params.id;
//   const recipeSteps = await getRecipeSteps(recipeId);
//   const recipeComments = await getRecipeComments(recipeId);
//   const recipeLikes = await getRecipeLikes(recipeId);
  
//   res.json({
//     steps: recipeSteps,
//     comments: recipeComments,
//     likes: recipeLikes
//   });
// }); // 둘다 구현하면 좋다!


export default router;