import { Router } from 'express';
import * as UserController from '../controllers/user_controller';
import * as DoodleController from '../controllers/doodle_controller';
import { requireSignin } from '../services/passport';

const router = Router();

// remove later + add auth
router.get('/', async (req, res) => {
  try {
    const result = await UserController.getUsers();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post('/signin', requireSignin, async (req, res) => {
  try {
    const token = UserController.signin(req.user);
    res.json({ token, user: req.user });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const token = await UserController.signup(req.body);
    res.json({ token, user: req.body });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const result = await UserController.getUser(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await UserController.deleteUser(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .post(async (req, res) => {
    try {
      const result = await UserController.updateUser(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router
  .route('/doodles/:id')
  .get(async (req, res) => {
    try {
      const result = await DoodleController.getUserDoodles(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

export default router;
