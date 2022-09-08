const model = require('../models');

// create main Model
const Product = model.products
const Review = model.reviews

// 1. create product

const addProducts = async(req,res)=>{
    console.log("adding products...",req.body);

    let productInfo = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    const productCall = await Product.create(productInfo);
    res.status(200).send(productCall);
    console.log("Product created successfully!! ",productCall.dataValues); 
}

// 2. get all products

const getAllProducts = async (req, res) => {

    let products = await Product.findAll({})
    res.status(200).send(products)

}

// 4. update Product

const updateProduct = async (req, res) => {

    let id = req.params.id

    const product = await Product.update(req.body, { where: { id: 1 }})

    res.status(200).send(product)
   

}

// 5. delete product by id

const deleteProduct = async (req, res) => {

    let id = req.params.id
    
    await Product.destroy({ where: { id: id }} )

    res.status(200).send('Product is deleted !')

}

// 7. connect one to many relation Product and Reviews

const getProductReviews =  async (req, res) => {

    const id = req.params.id

    const data = await Product.findOne({
        include: [{
            model: Review,
            as: 'review'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}
module.exports = {
    addProducts,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductReviews
};