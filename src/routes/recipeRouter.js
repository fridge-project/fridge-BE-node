import { Router } from 'express';
import Process from '../models/Process.js';
import Recipe from '../models/Recipe.js';
const router = Router();

router.get('/', async (req, res) => { // 전체 레시피 조회
  try{
    const recipe = await Recipe.find();

    return res.send(recipe);
  }
  catch(err) {
    return res.status(500).send("recipe 불러오기 실패");
  }
});

export default router;