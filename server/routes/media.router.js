import express from "express";
import authController from "../controllers/auth.controller";
import mediaController from "../controllers/media.controller";
import mediaCtrl from "../controllers/media.controller";
import userController from "../controllers/user.controller";
const router = express.Router();
router
  .route("/api/media/new/:userId")
  .post(mediaCtrl.create);
  
router.route("/api/media/popular").get(mediaCtrl.listPopular);

router.route('/api/media/video/:mediaId')
.get(mediaController.video)

router.route('/api/media/by/:userId')
.get(mediaCtrl.listByUser)

router.route('/api/media/by/:userId')
.get(mediaCtrl.read);

router
  .route("/api/media/:mediaId")
  .get(mediaCtrl.incrementViews, mediaCtrl.read)
  .put( mediaCtrl.isPoster, mediaCtrl.update);

router.route('/api/media/related/:mediaId')
.get(mediaCtrl.listRelated)

router.param("userId", userController.userById);
router.param("mediaId", mediaController.mediaById);



export default router;
