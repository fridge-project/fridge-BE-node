import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.send("GET /api/fridge TEST");
});

export default router;