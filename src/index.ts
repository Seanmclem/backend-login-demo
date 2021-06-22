import express, { Router } from "express";
import cors from "cors";

const app = express();

// const allowedOrigins = ["http://localhost:3000"];
// const options: cors.CorsOptions = {
//   origin: allowedOrigins,
// };
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("Server running on port 3000 ~~~");
});

const router = Router();

// app.get("/api-1", async (req, res, next) => {
//   if (tokenResult?.success) {
//     console.log(`TOKEN:`, "SUCCESS");
//   } else {
//     console.error("FAILED to get Braintree token, Sean");
//   }

//   res.json({
//     token: tokenResult?.clientToken,
//   });
// });

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
