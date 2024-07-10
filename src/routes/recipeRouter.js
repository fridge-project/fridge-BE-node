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

router.get('/:recipe_code', async (req, res) => { // 레시피 과정 상세 보기
  try{
    const { recipe_code } = req.params;

    const process = await Process.find({ recipe_code: recipe_code });

    return res.send(process);
  }
  catch(err) {
    return res.status(500).send("process 불러오기 실패");
  }
});

export default router;