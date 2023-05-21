import express from "express";
import { Updatebarcode } from "../controller/Barcode.js";
const router = express.Router();

router.get("/", Updatebarcode);
router.post("/StockOut");

export default router;
