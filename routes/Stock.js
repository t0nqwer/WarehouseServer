import express from "express";
import { StoreList } from "../controller/Store.js";
const router = express.Router();

router.post("/StockIn");
router.get("/StoreList", StoreList);
router.post("/StockOut");

export default router;
