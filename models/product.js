// Data dummy untuk menyimpan produk
let products = [];

function generateId() {
  const timestamp = Date.now().toString();
  const randomNum = Math.floor(Math.random() * 1000).toString();
  const uniqueId = timestamp + randomNum;
  return uniqueId;
}

class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  static getAllProducts() {
    return products;
  }

  static getProductById(productId) {
    return products.find((product) => product.id === productId);
  }

  static createProduct(name, price) {
    const id = generateId();
    const newProduct = new Product(id, name, price);
    products.push(newProduct);
    return newProduct;
  }

  static updateProduct(productId, name, price) {
    const product = products.find((product) => product.id === productId);
    if (product) {
      product.name = name;
      product.price = price;
      return product;
    } else {
      return null;
    }
  }

  static deleteProduct(productId) {
    const res = products.filter((product) => product.id !== productId);
    console.log(res);
    products = res;
    return res;
  }
}

module.exports = Product;
