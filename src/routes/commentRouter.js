import { Router } from 'express';
import Comment from '../models/comment.js';
import Recipe from '../models/recipe.js';
const router = Router();

router.get('/', async (req, res) => { // 댓글 작성한 레시피 보기
  try {
    const comments = await Comment.find({ user_id: req.user_id });

    console.log(comments);
    const recipes = await Promise.all(
      comments.map(async (comment) => {
        const recipe = await Recipe.findOne({ _id: comment.recipe_id });
        return recipe;
      })
    );
    return res.status(200).send(recipes);
  }
  catch(err) {
    return res.status(500).send("comments 불러오기 실패");
  }
})

router.post('/:recipe_id', async (req, res) => { // 댓글 작성
  try{
    const { recipe_id } = req.params;
    const { detail, grade, imageURL } = req.body;

    const newComment = new Comment ({ user_id : req.user._id, recipe_id, detail, grade, imageURL });

    const comment = await newComment.save();

    return res.status(201).send(comment);
  }
  catch(err) {
    return res.status(500).send(err); // "댓글 작성 실패"
  }
});

router.put('/:id', async (req, res) => { // 댓글 수정
  try {
    const { detail, grade, imageURL } = req.body;
    const { id } = req.params;

    const newComment = { detail, grade, imageURL };

    const updateComment = await Comment.findOneAndUpdate(
      { _id: id },
      newComment,
      { new: true, runValidators: true }
    );

    res.send(updateComment);
  }
  catch(err) {
    return res.status(500).send(err);
  }
})

router.delete('/:_id', async (req, res) => { // 댓글 삭제
  try{
    const { _id } = req.params;

    const delComment = await Comment.findOneAndDelete({ _id }); // 검색 조건

    if(delComment) res.status(200).send("delete completely");
    else res.status(400).send("400 Bad Request");
  }
  catch(err) {
    return res.status(500).send(err);
  }
});

export default router;