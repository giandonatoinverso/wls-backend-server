import * as controller from "../controllers/wholesales";
import * as auth from "../auth";

const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get("/", auth.jwtAccessTokenAuthMiddleware, controller.listVendite);
router.get("/testKey", auth.simpleAuthMiddleware, controller.testKey);
router.post("/vendite/new/", auth.jwtAccessTokenAuthMiddleware, controller.newVendita);
router.get("/vendite/:idVendita", auth.jwtAccessTokenAuthMiddleware, controller.getVendita);
router.get("/vendite/venditore/:idVenditore", auth.jwtAccessTokenAuthMiddleware, controller.getVenditeVenditore);
router.get("/vendite/cliente/:idCliente", auth.jwtAccessTokenAuthMiddleware, controller.getVenditeCliente);
router.get("/vendite/prodotto/:idProdotto", auth.jwtAccessTokenAuthMiddleware, controller.getVenditeProdotto);
router.post("/vendite/edit/", auth.jwtAccessTokenAuthMiddleware, controller.editVendita);
router.post("/vendite/delete/", auth.jwtAccessTokenAuthMiddleware, controller.deleteVendita);

router.get("/prodotti", auth.simpleAuthMiddleware, controller.listProdotti);
router.post("/prodotti/new/", auth.jwtAccessTokenAuthMiddleware, controller.newProdotto);
router.get("/prodotti/:idProdotto", auth.jwtAccessTokenAuthMiddleware, controller.getProdotto);
router.post("/prodotti/edit/", auth.jwtAccessTokenAuthMiddleware, controller.editProdotto);
router.post("/prodotti/delete/", auth.jwtAccessTokenAuthMiddleware, controller.deleteProdotto);

module.exports = router;
