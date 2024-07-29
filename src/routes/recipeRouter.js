import { Router } from 'express';
import passport from 'passport';
const router = Router();

import Process from '../models/Process.js';
import Recipe from '../models/recipe.js';
import Comment from '../models/comment.js';
import Like from '../models/like.js';
import Favorite from '../models/favorite.js';
import User from '../models/User.js';

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

    const comments = await Comment.find({ recipe_id });

    const updatedComments = await Promise.all(comments.map(async (comment) => {
      const user = await User.findOne({ _id: comment.user_id });
      const username = user.username;
      
      // 일시적으로 username을 추가
      return { ...comment._doc, username }; // ._doc을 사용하여 원래의 comment 데이터를 복사
    }));
    
    const grade = comments.reduce((res, comment) => res + comment.grade, 0);
    const avg = (grade / comments.length);

    const process = await Process.find({ recipe_code });

    const likeAll = await Like.find({ recipe_id });
    const likeCount = likeAll.length;
    const like = likeAll.filter((like) => like.user_id.equals(req.user._id));

    const favoriteAll = await Favorite.find({ recipe_id });
    const favoriteCount = favoriteAll.length;
    const favorite = favoriteAll.filter((favorite) => favorite.user_id.equals(req.user._id));

    return res.send({process, updatedComments, like, favorite, avg, likeCount, favoriteCount});
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