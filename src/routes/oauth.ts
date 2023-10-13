import * as controller from "../controllers/oauth";
import * as auth from "../auth";

const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get("/testKey", auth.simpleAuthMiddleware, controller.testKey);
router.post("/clientInfo", auth.simpleAuthMiddleware, controller.getClientInfo);
router.get("/userScopes", auth.jwtAccessTokenAuthMiddleware, controller.getUserScopes);
router.post("/userInfo", auth.simpleAuthMiddleware, controller.getUserInfo);
router.get("/authorizationCode", auth.jwtAuthMiddleware, controller.getAuthorizationCode);
router.get("/authorizationCodeAccessToken", auth.jwtAuthMiddleware, controller.exchangeAuthorizationCodeAccessToken);
router.get("/refreshTokenAccessToken", auth.jwtAuthMiddleware, controller.exchangeRefreshTokenAccessToken);

module.exports = router;
