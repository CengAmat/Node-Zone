const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
    .then((result) => {
      // console.log(result);
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     res.redirect("/");
//   }
//   const productId = req.params.productId;
//   req.user
//     .getProducts({ where: { id: productId } })
//     // Product.findByPk(productId)
//     .then((products) => {
//       const product = products[0];
//       if (!product) {
//         res.redirect("/");
//       }
//       res.render("admin/edit-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product: product,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.postEditProduct = (req, res, next) => {
//   const productId = req.body.productId;
//   const { title, price, imageUrl, description } = req.body;

//   Product.findByPk(productId)
//     .then((product) => {
//       product.title = title;
//       product.price = price;
//       product.imageUrl = imageUrl;
//       product.description = description;
//       return product.save();
//     })
//     .then((result) => {
//       console.log("UPDATED PRODUCT!");
//       res.redirect("/admin/products");
//     })
//     .catch((err) => console.log(err));
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const productId = req.body.productId;
//   Product.findByPk(productId)
//     .then((product) => {
//       return product.destroy();
//     })
//     .then((result) => {
//       console.log("DELETED PRODUCT!");
//       res.redirect("/admin/products");
//     })
//     .catch((err) => console.log(err));
// };

// exports.getProducts = (req, res, next) => {
//   req.user
//     .getProducts()
//     .then((products) => {
//       res.render("admin/products", {
//         prods: products,
//         pageTitle: "Admin Products",
//         path: "/admin/products",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
