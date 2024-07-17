import { Router } from 'express';
const router = Router();

import recipe_ingredients from '../js/recipe_ingredients.js';
import recipe_process from '../js/recipe_process.js';
import recipes from '../js/recipes.js';

import RecipeIngredient from "../models/recipe_ingredient.js";
import Process from '../models/Process.js';
import Recipe from '../models/recipe.js';
import Ingredient from '../models/ingredient.js';

router.get('/', (req, res) => {
  res.send("GET /init TEST");
});

router.get('/recipe-ingredient', async (req, res) => {
  try {
    await RecipeIngredient.insertMany(recipe_ingredients);
    res.send("초기 데이터 입력 완료");
  } catch (error) {
    console.error(error);
    res.status(500).send("데이터 입력 중 오류 발생");
  }
});

router.get('/process', async (req, res) => {
  try {
		await Process.insertMany(recipe_process);
    res.send("초기 데이터 입력 완료");
  } catch (error) {
    console.error(error);
    res.status(500).send("데이터 입력 중 오류 발생");
  }
});

router.get('/recipe', async (req, res) => {
  try {
		await Recipe.insertMany(recipes);
    res.send("초기 데이터 입력 완료");
  } catch (error) {
    console.error(error);
    res.status(500).send("데이터 입력 중 오류 발생");
  }
});

router.get('/ingredients', async (req, res) => {
  try {
    const ingredients = await RecipeIngredient.distinct('name');
    const objectsArray = ingredients.map(item => ({ name: item }));
    await Ingredient.insertMany(objectsArray);

    res.send("초기 데이터 입력 완료");
  } catch (error) {
    console.error(error);
    res.status(500).send("데이터 입력 중 오류 발생");
  }
})

export default router;