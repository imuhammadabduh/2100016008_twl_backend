const express = require("express");
const app = express();
require('dotenv').config()
const port = 3000;

// Middleware
const logger = require("./middleware/logger");

// Routes
const productRoutes = require("./routes/products");
const { default: mongoose } = require("mongoose");

// Middleware untuk parsing body pada permintaan POST dan PUT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Menggunakan logger middleware di seluruh aplikasi
app.use(logger);

// Mengarahkan rute ke file produk
app.use("/products", productRoutes);

// Penanganan Kesalahan 404 (Not Found)
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Penanganan Kesalahan 500 (Internal Server Error)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Menjalankan server
app.listen(port, () => {
  // Connect to MongoDB
  mongoose
    .connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      mongoose.connection;
      console.log(`Database berjalan`);
    });

  console.log(`Server berjalan di http://localhost:${port}`);
});
