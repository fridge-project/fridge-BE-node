import { Router } from 'express';
import Comment from '../models/comment.js';
const router = Router();

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