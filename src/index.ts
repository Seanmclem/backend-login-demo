import express, { Router } from "express";
import cors from "cors";
import fs from "fs";

export interface User {
  address: string;
  clientid: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  role: "client" | "admin" | "user";
}

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

app.get("/login", async (req, res, next) => {
  // const { email } = req.body;
  const { email } = req.query as any;

  let rawdata = fs.readFileSync("server/users.json");
  let data: { users: User[] } = JSON.parse(rawdata as any);
  const user = data?.users.find((u) => u.email === email);
  // console.log(user);
  res.send(user ? { user: user } : {});
});

app.post("/users", async (req, res, next) => {
  const { email } = req.body;
  console.log(req.body);
  let rawdata = fs.readFileSync("server/users.json");
  let data: { users: User[] } = JSON.parse(rawdata as any);
  const user = data?.users.find((u) => u.email === email);
  const users = getUsersForRole(data?.users, user);
  res.json({ users });
});

const getUsersForRole = (users: User[], user?: User) => {
  switch (user?.role) {
    case "admin":
      return users;
    case "client":
      return users.filter((u) => user.clientid === u.clientid);
    case "user":
      return [user];
    default:
      return [];
  }
};

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
