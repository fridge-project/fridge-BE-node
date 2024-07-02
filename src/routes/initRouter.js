import { Router } from 'express';
const router = Router();

import recipe_ingredients from '../js/recipe_ingredients.js';
import recipe_process from '../js/recipe_process.js';
import recipes from '../js/recipes.js';

import Ingredient from "../models/Ingredient.js";
import Process from '../models/Process.js';
import Recipe from '../models/Recipe.js';

router.get('/', (req, res) => {
  res.send("GET /init TEST");
});

router.get('/ingredient', async (req, res) => {
  try {
    await Ingredient.insertMany(recipe_ingredients);
  } catch (error) {
    console.error(error);
    res.status(500).send("데이터 입력 중 오류 발생");
  }

  res.send("초기 데이터 입력 완료");
});

router.get('/process', async (req, res) => {
  try {
		await Process.insertMany(recipe_process);
  } catch (error) {
    console.error(error);
    res.status(500).send("데이터 입력 중 오류 발생");
  }

  res.send("초기 데이터 입력 완료");
});

router.get('/recipe', async (req, res) => {
  try {
		await Recipe.insertMany(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).send("데이터 입력 중 오류 발생");
  }

  res.send("초기 데이터 입력 완료");
});


export default router;