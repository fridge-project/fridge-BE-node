import { Router } from 'express';
import Recipe from '../models/recipe.js';
import Favorite from '../models/favorite.js';
const router = Router();

// 해당 레시피 에 대한 즐겨찾기 여부 => 레시피 상세 정보!!!
// A가 즐겨찾기를 누른 레시피 조회!!
// A가 즐겨찾기를 누르는 api

router.get('/', async (req, res) => { // 즐겨찾기 누른 레시피 보기
  try {
    const favorites = await Favorite.find({ user_id: req.user._id });

    const recipes = await Promise.all(
      favorites.map(async (favorite) => {
        const recipe = await Recipe.findOne({ _id: favorite.recipe_id });
        return recipe;
      })
    );

    return res.status(200).send(recipes);
  }
  catch(err) {
    return res.status(500).send("favorites 불러오기 실패");
  }
});

router.post('/:recipe_id', async (req, res) => {
  try {
    const { recipe_id } = req.params;

    const favorite = await Favorite.findOne({ user_id: req.user._id, recipe_id });

    if(favorite) { // 이미 즐겨찾기 눌린 경우
      await Favorite.findByIdAndDelete(favorite._id);
      return res.status(200).send("즐겨찾기 취소 성공");
    }
    else { // 즐겨찾기 안눌린 경우
      const newFavorite = new Favorite ({ user_id: req.user._id, recipe_id });

      const favorite = await newFavorite.save();
      return res.status(200).send("즐겨찾기 성공");
    }

  }
  catch(err) {
    return res.status(500).send("즐겨찾기 실패");
  }
});

export default router;