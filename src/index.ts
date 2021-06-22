import express, { Router } from "express";
import cors from "cors";
import fs from "fs";

const app = express();

// const allowedOrigins = ["http://localhost:3000"];
// const options: cors.CorsOptions = {
//   origin: allowedOrigins,
// };
app.use(cors());
app.use(express.json());

app.listen(3100, () => {
  console.log("Server running on port 3100 ~~~");
});

const router = Router();

app.get("/users", async (req, res, next) => {
  let rawdata = fs.readFileSync("server/users.json");
  let users = JSON.parse(rawdata as any);

  res.json(users);
});

// router.post('/user', checkIfAuthenticated, async (req, res) => {
//   return UserController.insert(req, res);
// });

// router.get('/user', checkIfAdmin, async (req, res) => {
//   return UserController.getAll(req, res);
// });

// router.get('/user/:uid', checkIfAuthedAsUID, async (req, res) => { // These are a series of functions... next() triggers the next -from the prev..
//   return UserController.get(req, res);
// });

// router.post('/user/:uid', checkIfAuthedAsUID, async (req, res) => { // These are a series of functions... next() triggers the next -from the prev..
//   return UserController.update(req, res);
// });
