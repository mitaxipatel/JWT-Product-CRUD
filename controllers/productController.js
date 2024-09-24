const Product = require('../models/productModel');

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { productName, description, price, category, stockQuantity } = req.body;

        const newProduct = new Product({
            productName,
            description,
            price,
            category,
            stockQuantity,
            createdBy: req.userId 
        });

        const savedProduct = await newProduct.save();
        res.status(201).send({ message: "Product created successfully", product: savedProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send({ message: "Error creating product" });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('createdBy', 'email');
        res.status(200).send(products);
    } catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).send({ message: "Error retrieving products" });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('createdBy', 'email');
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send(product);
    } catch (error) {
        console.error("Error retrieving product:", error);
        res.status(500).send({ message: "Error retrieving product" });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { productName, description, price, category, stockQuantity } = req.body;

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        if (product.createdBy.toString() !== req.userId) {
            return res.status(403).send({ message: "Unauthorized: You can only update your own products" });
        }

        product.productName = productName;
        product.description = description;
        product.price = price;
        product.category = category;
        product.stockQuantity = stockQuantity;

        const updatedProduct = await product.save();
        res.status(200).send({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send({ message: "Error updating product" });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        if (product.createdBy.toString() !== req.userId) {
            return res.status(403).send({ message: "Unauthorized: You can only delete your own products" });
        }

        await product.deleteOne();
        res.status(200).send({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send({ message: "Error deleting product" });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
