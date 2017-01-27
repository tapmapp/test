var express = require('express');
var router = express.Router();
var ProductsCtr = require ('./../productsCtr');
var CategoriesCtr = require ('./../categoriesCtr');

// devolver todos los Producto
router.get('/product', ProductsCtr.getProducts);
// Crear una nueva Producto
router.post('/product', ProductsCtr.setProducts);
// Modificar los datos de una Producto
router.put('/product/:product_id', ProductsCtr.updateProducts);
// Borrar una Producto
router.delete('/product/:product_id', ProductsCtr.removeProducts);

// devolver todas las Categorias
router.get('/category', CategoriesCtr.getCategories);
// Crear una nueva Categoria
router.post('/category', CategoriesCtr.setCategory);
// Modificar los datos de una Categoria
router.put('/category/:category_id', CategoriesCtr.updateCategory);
// Borrar una Categoria
router.delete('/category/:category_id', CategoriesCtr.removeCategory);

module.exports = router;