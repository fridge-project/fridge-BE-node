import { Router } from 'express';
import Recipe from '../models/recipe.js';
import Ingredient from '../models/ingredient.js';
const router = Router();

router.get('/', async (req, res) => { // 전체 재료 조회
    try{
      const ingredients = await Ingredient.find();
  
      return res.send(ingredients);
    }
    catch(err) {
      return res.status(500).send("ingredients 불러오기 실패");
    }
  });

	export default router;