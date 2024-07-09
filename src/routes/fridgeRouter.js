import { Router } from 'express';
import Fridge from '../models/fridge.js';
const router = Router();

router.get('/', async (req, res) => { // 보유재료 조회
  try{
    const fridge = await Fridge.find();

    return res.send(fridge);
  }
  catch(err) {
    return res.status(500).send("fridge 불러오기 실패");
  }

});

router.post('/', async (req, res) => { // 보유재료 등록
  try{
    const { name, memo, storage, exp, date, imageURL } = req.body;

    const newIngredient = new Fridge ({ name, memo, storage, exp, date, imageURL });

    const fridge = await newIngredient.save();

    return res.send(fridge);
  }
  catch(err) {
    return res.status(500).send(err);
  }

});

router.put('/:id', async (req, res) => { // 보유재료 수정
  try{
    const { name, memo, storage, exp, date, imageURL } = req.body;
    const { id } = req.params;

    const newIngredient = { name, memo, storage, exp, date, imageURL };

    const updateFridge = await Fridge.findOneAndUpdate(
      { _id: id }, // 검색 조건
      newIngredient, // 업데이트할 데이터
      { new: true, runValidators: true } // 옵션
    );

    res.send(updateFridge);
  }
  catch(err) {
    return res.status(500).send(err);
  }
});

router.delete('/:id', async (req, res) => { // 보유재료 삭제
  try{
    const { id } = req.params;

    await Fridge.findOneAndDelete({ _id: id }); // 검색 조건

    res.status(200).send("delete completely");
  }
  catch(err) {
    return res.status(500).send(err);
  }
});

export default router;