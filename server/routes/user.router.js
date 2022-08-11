import express from 'express'

const router = express.Router();
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller';


router.route('/api/users')
.get(userCtrl.list)
.post(userCtrl.create)


router.route('/api/user/:userId')
.get(authCtrl.requireSingnin, userCtrl.read)
.put(authCtrl.requireSingnin, authCtrl.hasAuthorization, userCtrl.update)
.delete(authCtrl.requireSingnin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userById)

export default router;
