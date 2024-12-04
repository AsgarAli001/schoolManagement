import express from "express";
import bodyParser from "body-parser";

import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import schoolRoutes from "./routes/school.routes.js";
app.use("/api/v1", schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
