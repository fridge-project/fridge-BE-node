import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.send("GET /api/recipe TEST");
});

export default router;