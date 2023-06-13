const mongoose = require("mongoose");

// Define the product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

// Define the Product model
const Product = mongoose.model("Product", productSchema);

class ProductService {
  static async getAllProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getProductById(productId) {
    try {
      const product = await Product.findById(productId);
      return product;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async createProduct(name, price) {
    try {
      const product = new Product({ name, price });
      await product.save();
      return product;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async updateProduct(productId, name, price) {
    try {
      const product = await Product.findByIdAndUpdate(
        productId,
        { name, price },
        { new: true }
      );
      return product;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteProduct(productId) {
    try {
      const product = await Product.findByIdAndDelete(productId);
      return product;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = ProductService;
