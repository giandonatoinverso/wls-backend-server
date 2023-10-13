import * as controller from "../controllers/utenti";
import * as auth from "../auth";

const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get("/id/:id", auth.jwtAccessTokenAuthMiddleware, controller.getUtenteById);
router.get("/username/:username", auth.jwtAccessTokenAuthMiddleware, controller.getUtenteByUsername);

module.exports = router;
