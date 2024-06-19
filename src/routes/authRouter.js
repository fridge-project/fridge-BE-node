import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.send("GET /api/auth TEST");
});

export default router;