const Cart = require("./cart");

const db = require("../util/database");

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    return db.execute(
      "INSERT INTO products_old (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute("SELECT * FROM products_old");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products_old WHERE products_old.id = ?", [
      id,
    ]);
  }
};
