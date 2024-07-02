import { Router } from 'express';
import Process from '../models/Process.js';
const router = Router();

router.get('/', (req, res) => {
  res.send("GET /api/recipe TEST");
});

router.get('/testData', (req, res) => {
  let processData = new Process ({
    recipe_code : 1,
    order_num : 1,
    detail : "양지머리로 육수를 낸 후 식혀 기름을 걷어낸 후, 불린 쌀을 넣어 고슬고슬하게 밥을 짓는다.",
    imageURL : "http://file.okdab.com/UserFiles/searching/recipe/000200_p01.jpg",
    tip : "없음"
  })
  processData.save();
  res.send("HI");
})

export default router;