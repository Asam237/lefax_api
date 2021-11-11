const bcryptjs = require("bcryptjs")
const Order = require("../models/Order")
const Product = require("../models/Product")


exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            console.log(products);
            return res.json(products)
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getProduct = (req, res, next) => {
    Product.findById(prodId)
        .then(product => {
            console.log(product)
            return res.json(product)
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getCart = (req, res, next) => {
    req.user
        .then(user => {
            return res.json(user)
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
            return res.json(result)
        });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .removeFromCart(prodId)
        .then(result => {
            return res.json(result)
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postOrder = (req, res, next) => {
    req.user
        .then(user => {
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, product: { ...i.productId._doc } };
            });
            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.user
                },
                products: products
            });
            return order.save();
        })
        .then(result => {
            console.log(result)
            return req.user.clearCart();
        })
        .catch(err => {
            console.log(err);
        });
};
