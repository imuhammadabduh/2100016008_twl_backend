const express = require("express");
const router = express.Router();

// Model produk
const Product = require("../models/product");

// Rute GET untuk mendapatkan semua produk
router.get("/", async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Rute GET untuk mendapatkan produk berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ... tambahkan rute lainnya untuk operasi CRUD

// Menangani permintaan POST untuk membuat produk baru
router.post("/", async (req, res) => {
  try {
    const { name, price } = req.body;
    const resresponse = await Product.createProduct(name, price);
    res.status(201).json(resresponse);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Menangani permintaan PUT untuk memperbarui produk berdasarkan ID
router.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price } = req.body;
    const response = await Product.updateProduct(productId, name, price);
    res.json(response);
    res.status(404).json({ error: "Product not found" });
  } catch (error) {}
});

// Menangani permintaan DELETE untuk menghapus produk berdasarkan ID
router.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  const response = await Product.deleteProduct(productId);
  res.json(response);
});

module.exports = router;
