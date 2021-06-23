import express, { Router } from "express";
import cors from "cors";
import fs from "fs";
import { v4 as uuid } from "uuid";

export interface User {
  objectId: string;
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

app.listen(process.env.PORT || 3100, () => {
  console.log(`Server running on port ${process.env.PORT || "3100"} ~~~`);
});

// const router = Router();

app.get("/login", async (req, res, next) => {
  // const { email } = req.body;
  const { email } = req.query as any;

  let rawdata = fs.readFileSync("server/users.json");
  let data: { users: User[] } = JSON.parse(rawdata as any);
  const user = data?.users.find((u) => u.email === email);
  // console.log(user);
  res.send(user ? { user: user } : {});
});

app.post("/users/create", async (req, res, next) => {
  const { newUser } = req.body;
  const { creator } = req.body;

  newUser.objectId = uuid();

  // console.log(newUser);
  let rawdata = fs.readFileSync("server/users.json");
  // res.json({ ok: "ok" });
  let data: { users: User[] } = JSON.parse(rawdata as any);
  const existingUser = data?.users.find((u) => u.email === newUser.email);
  // if the user does not exist and they are not role user, or they're a clietn with the same client ID
  if (
    (!existingUser && creator?.role === "user") ||
    (!existingUser &&
      creator?.role === "client" &&
      creator?.clientid !== newUser?.clientid)
  ) {
    data.users.push(newUser);
    const newData = JSON.stringify(data);
    fs.writeFileSync("server/users.json", newData);
    const allowedUsers = getUsersForRole(data.users, creator);
    res.json({ users: allowedUsers, newUser });
  } else {
    const allowedUsers = getUsersForRole(data.users, creator);
    res.json({ users: allowedUsers, newUser: existingUser });
  }
});

app.post("/users", async (req, res, next) => {
  const { email } = req.body; // of the requestor
  const { search } = req.query as any;
  const { id } = req.query as any;
  // console.log(req.params);

  let rawdata = fs.readFileSync("server/users.json");
  let data: { users: User[] } = JSON.parse(rawdata as any);
  const user = data?.users.find((u) => u.email === email);
  console.log(req.body);
  const allUsers = getUsersForRole(data?.users, user);
  const users = search || id ? searchUsers(allUsers, search, id) : allUsers;
  res.json({ users });
});

const searchUsers = (users: User[], query: string, id: string) => {
  if (query) {
    return users.filter((u) => {
      const uFirst = u.firstname.toLowerCase();
      const uLast = u.lastname.toLowerCase();
      const uEmail = u.email.toLowerCase();
      return (
        uFirst.includes(query) ||
        uLast.includes(query) ||
        uEmail.includes(query)
      );
    });
  } else if (id) {
    return users.find((u) => u.objectId === id);
  } else {
    return users;
  }
};

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
