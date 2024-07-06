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

  // name : { type: String, required: true},
	// memo : { type: String },
	// storage : { type: String },
	// exp : { type: String },
	// date : { type: String },
	// imageURL : { type: String },
  // ingredient_id : { type: mongoose.Schema.Types.ObjectId, ref: "ingredient"}

    return res.send(fridge);
  }
  catch(err) {
    return res.status(500).send(err);
    // return res.status(500).send("ingredients 불러오기 실패");
  }

});

export default router;