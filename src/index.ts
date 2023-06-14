import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter";
import productRouter from "./routes/productRouter";
import dotenv from "dotenv";
dotenv.config();

// Membuat koneksi ke database MongoDB
const configDB: Object = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const dbUrl: string = process.env.MONGO_URI || "mongodb://localhost:27017/twl"; // Ganti dengan URL MongoDB Anda
mongoose
  .connect(dbUrl, configDB)
  .then(() => {
    console.log("Terhubung ke database MongoDB");
  })
  .catch((error) => {
    console.log("Kesalahan saat terhubung ke database:", error);
  });

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/products", productRouter);

const port = 3000; // Ganti dengan port yang ingin Anda gunakan
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
