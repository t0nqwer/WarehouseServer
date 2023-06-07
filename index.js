import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { verify } from "./middleware/authorize.js";
import { CheckBarcode } from "./controller/updateBarcode.js";
import BarcodeRoute from "./routes/Barcode.js";
import StockRoute from "./routes/Stock.js";
import {
  addNewUser,
  addsize,
  newCloth,
  removeUser,
  updatePrice,
} from "./controller/socketio.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const router = express.Router();
router.use(verify);

app.use(
  "/",
  router.get("", (req, res) => {
    res.status(200).json({ message: "Hello World" });
  })
);
app.use("/barcode", BarcodeRoute);
app.use("/stock", StockRoute);
const port = parseInt(process.env.PORT) || 7080;
const server = app.listen(port, () => {
  console.log(`helloworld: listening on http://localhost:${port}`);
});
export const io = new Server(server);
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("price", (data) => {
    updatePrice(data.barcode, data.price);
    socket.broadcast.emit("price", data);
  });
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });
  socket.on("addSize", ({ data }) => {
    addsize(data);
    socket.broadcast.emit("addSize", data);
  });
  socket.on("newCloth", ({ data }) => {
    newCloth(data);
    socket.broadcast.emit("newCloth", data);
  });
  socket.on("newexample", ({ data }) => {
    newCloth(data);
    socket.broadcast.emit("newexample", data);
  });
  socket.on("disconnect", (reason) => {
    console.log(reason);
    removeUser(socket.id);
  });
  socket.on("stockIn", (data) => {
    console.log(data);
  });
});
// io.attach(server);
