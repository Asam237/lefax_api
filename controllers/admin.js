const Product = require("../models/Product")

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.body.image;

    const product = new Product({
        title: title,
        price: price,
        description: description,
        image: image
    })
    product.save()
        .then(result => {
            return res.json(result)
        })
        .catch(err => {
            console.log(err)
        })

}