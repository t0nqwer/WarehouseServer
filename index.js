import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import { Server } from "socket.io";

dotenv.config();
const app = express();
mongoose.connect(process.env.MONGO_URI, {}).then(() => {
  console.log("Connected to MongoDB");
});
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const router = express.Router();
app.use(
  "/",
  router.get("", (req, res) => {
    res.status(200).json({ message: "Hello World" });
  })
);
const port = parseInt(process.env.PORT) || 7070;
const server = app.listen(port, () => {
  console.log(`helloworld: listening on http://localhost:${port}`);
});
const io = new Server({
  pingTimeout: 60000,
  cors: {
    origin: ["http://localhost:3000", ["https://khwantadashboard.web.app/"]],
  },
});
io.attach(server);

io.on("connection", (socket) => {
  console.log("a user connected");
});
