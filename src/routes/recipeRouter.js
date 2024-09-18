import { Router } from 'express';
import passport from 'passport';
const router = Router();

import Process from '../models/Process.js';
import Recipe from '../models/recipe.js';
import Comment from '../models/comment.js';
import Like from '../models/like.js';
import Favorite from '../models/favorite.js';
import User from '../models/User.js';
import RecipeIngredient from '../models/recipe_ingredient.js';
import Fridge from '../models/fridge.js';

router.get('/', async (req, res) => { // 전체 레시피 조회
  try{
    const recipe = await Recipe.find();

    return res.send(recipe);
  }
  catch(err) {
    return res.status(500).send("recipe 불러오기 실패");
  }
});

router.get('/detail/:recipe_code', passport.authenticate('jwt', { session : false }), async (req, res) => { // 레시피 과정 상세 보기
  try{
    const { recipe_code } = req.params;

    const recipe = await Recipe.findOne({ recipe_code });
    const recipe_id = recipe._id;

    const recipe_ingredient = await RecipeIngredient.find({ recipe_code });

    const comments = await Comment.find({ recipe_id });

    const user = await User.findOne({ _id: req.user._id });
    const username = user.username;
    const email = user.email;

    const updatedComments = await Promise.all(comments.map(async (comment) => {
      const user = await User.findOne({ _id: comment.user_id });
      const username = user.username;
      const email = user.email;
      
      // 일시적으로 username, email을 추가
      return { ...comment._doc, username, email }; // ._doc을 사용하여 원래의 comment 데이터를 복사
    }));
    
    let gradeArr = new Array(6).fill(0);
    comments.forEach((comment) => {
      gradeArr[comment.grade]++;
      gradeArr[0] += comment.grade;
    })

    gradeArr[0] = comments.length == 0 ? 0 : (gradeArr[0] / comments.length);

    const process = await Process.find({ recipe_code });

    const likeAll = await Like.find({ recipe_id });
    const likeCount = likeAll.length;
    const like = likeAll.filter((like) => like.user_id.equals(req.user._id));

    const favoriteAll = await Favorite.find({ recipe_id });
    const favoriteCount = favoriteAll.length;
    const favorite = favoriteAll.filter((favorite) => favorite.user_id.equals(req.user._id));

    return res.send({process, recipe_ingredient, updatedComments, like, favorite, likeCount, favoriteCount, gradeArr, username, email});
  }
  catch(err) {
    return res.status(500).send(err); // "process 불러오기 실패"
  }
});

router.get('/available', passport.authenticate('jwt', { session : false }), async (req, res) => {
  try{
    // 사용자의 전체 보유재료 조회 -> 이름 배열에 담기.
    const fridge = await Fridge.find();

    console.log(fridge);
    const ingredients = fridge.map((ingredient) => {
      return ingredient.name;
    })
    console.log(ingredients);

    // mongoose에서 쿼리문 짜는법 등 방법 찾아보기.


    // const recipe = await Recipe.find();

    return res.send("HI");
  }
  catch(err) {
    return res.status(500).send("recipe 불러오기 실패");
  }
});


export default router;