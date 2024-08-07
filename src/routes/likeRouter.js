import { Router } from 'express';
import Like from '../models/like.js';
import Recipe from '../models/recipe.js';
const router = Router();

// 해당 레시피 에 대한 좋아요 여부 => 레시피 상세 정보!!!
// A가 좋아요를 누른 레시피 조회!!
// A가 좋아요를 누르는 api

router.get('/', async (req, res) => { // 좋아요 누른 레시피 보기
  try {
    const likes = await Like.find({ user_id: req.user._id });

    const recipes = await Promise.all(
      likes.map(async (like) => {
        const recipe = await Recipe.findOne({ _id: like.recipe_id });
        return recipe;
      })
    );

    return res.status(200).send(recipes);
  }
  catch(err) {
    return res.status(500).send("likes 불러오기 실패");
  }
});

router.post('/:recipe_id', async (req, res) => {
  try {
    const { recipe_id } = req.params;

    const like = await Like.findOne({ user_id: req.user._id, recipe_id });

    if(like) { // 이미 좋아요 눌린 경우
      await Like.findByIdAndDelete(like._id);
      return res.status(200).send("좋아요 취소 성공");
    }
    else { // 좋아요 안눌린 경우
      const newLike = new Like ({ user_id: req.user._id, recipe_id });

      const like = await newLike.save();
      return res.status(200).send("좋아요 성공");
    }

  }
  catch(err) {
    return res.status(500).send("좋아요 실패");
  }
});

export default router;